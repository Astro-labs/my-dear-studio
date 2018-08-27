const path = require('path')

// we use sourceNodes instead of onCreateNode because
//  at this time plugins will have created all nodes already

exports.sourceNodes = ({ boundActionCreators: { createNodeField }, getNodes, getNode }) => {
  // iterate thorugh all markdown nodes to link page to projects
  const { homeNodeId, projectNodeIds } = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .reduce(
      (acc, node) =>
        node.frontmatter.templateKey && node.frontmatter.templateKey.includes('home')
          ? { ...acc, homeNodeId: node.id, homeProjects: node.frontmatter.projects.map(item => item.project) }
          : node.frontmatter.templateKey &&
            node.frontmatter.templateKey.includes('project') &&
            acc.homeProjects.includes(node.frontmatter.title)
            ? { ...acc, projectNodeIds: [...acc.projectNodeIds, node.id] }
            : acc,
      { homeNodeId: '', homeProjects: [], projectNodeIds: [] },
    )

  createNodeField({
    node: getNode(homeNodeId),
    name: 'projects',
    value: projectNodeIds,
  })

  const images = getNodes().filter(node => node.internal.type === 'ImageSharp')

  getNodes().forEach(node => {
    if (node.internal.type === 'MarkdownRemark' && node.frontmatter.templateKey === 'project') {
      const image = images.find(image => {
        return image.id.includes(node.frontmatter.featuredImage)
      })
      createNodeField({
        node,
        name: 'featuredImage',
        value: image ? image.id : null,
      })
    }
  })

  getNodes().forEach(node => {
    if (node.internal.type === 'MarkdownRemark' && node.frontmatter.templateKey === 'project') {
      const image = images.find(image => {
        return image.id.includes(node.frontmatter.featuredOnProjectImage)
      })
      createNodeField({
        node,
        name: 'featuredOnProjectImage',
        value: image ? image.id : null,
      })
    }
  })

  getNodes().forEach(node => {
    if (node.internal.type === 'MarkdownRemark' && node.frontmatter.templateKey === 'project') {
      createNodeField({
        node,
        name: 'images',
        value: node.frontmatter.images.map(imageObj => {
          const imageParsed = images.find(image => {
            return image.id.includes(imageObj.image)
          })
          return {
            row: imageObj.row,
            videoLink: imageObj.videoLink,
            image: imageParsed ? imageParsed.id : null,
          }
        }),
      })
    }
  })

  const { aboutNodeId, aboutTeam, teamMemberNodeIds } = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .reduce(
      (acc, node) => {
        console.log({
          templateKey: node.frontmatter.templateKey,
          aboutTeam: node.frontmatter.team && node.frontmatter.team.map(item => item.teamMember),
          title: node.frontmatter.title,
        })

        return node.frontmatter.templateKey && node.frontmatter.templateKey.includes('about')
          ? { ...acc, aboutNodeId: node.id, aboutTeam: node.frontmatter.team.map(item => item.teamMember) }
          : node.frontmatter.templateKey &&
            node.frontmatter.templateKey.includes('teamMember') &&
            acc.aboutTeam.includes(node.frontmatter.title)
            ? { ...acc, teamMemberNodeIds: [...acc.teamMemberNodeIds, node.id] }
            : acc
      },
      { aboutNodeId: '', aboutTeam: [], teamMemberNodeIds: [] },
    )

  console.log({ aboutNodeId, aboutTeam, teamMemberNodeIds })

  createNodeField({
    node: getNode(aboutNodeId),
    name: 'team',
    value: teamMemberNodeIds,
  })
}

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          projects: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "project" } } }) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.projects.edges.forEach(({ node: { frontmatter: project } }) => {
          createPage({
            path: path.join('project', project.slug),
            component: path.resolve('./src/templates/project.js'),
            context: {
              slug: project.slug,
            },
          })
        })
      }),
    )
  })
