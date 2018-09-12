const path = require('path')

// we use sourceNodes instead of onCreateNode because
//  at this time plugins will have created all nodes already

const getDataNode = ({ node, langCode }) =>
  node.frontmatter.languages.find(({ language }) => language === langCode) || {}

exports.sourceNodes = ({ boundActionCreators: { createNodeField }, getNodes, getNode }) => {
  // iterate thorugh all markdown nodes to link page to projects
  const mds = getNodes().filter(
    node => node.internal.type === 'MarkdownRemark' && Boolean(node.frontmatter.templateKey),
  )
  const images = getNodes().filter(node => node.internal.type === 'ImageSharp')

  const codeLanguages = mds
    .filter(node => node.frontmatter.templateKey.includes('language'))
    .map(node => node.frontmatter.title)

  codeLanguages.forEach(langCode => {
    const { homeNodeId, projectNodeIds } = mds.reduce(
      (acc, node) =>
        node.frontmatter.templateKey.includes('home')
          ? {
              ...acc,
              homeNodeId: node.id,
              homeProjects: getDataNode({ langCode, node }).projects.map(item => item.project),
            }
          : node.frontmatter.templateKey.includes('project') && acc.homeProjects.includes(node.frontmatter.title)
            ? { ...acc, projectNodeIds: [...acc.projectNodeIds, node.id] }
            : acc,
      { homeNodeId: '', homeProjects: [], projectNodeIds: [] },
    )

    createNodeField({
      node: getNode(homeNodeId),
      name: 'projects',
      value: projectNodeIds,
    })

    mds.forEach(node => {
      if (node.frontmatter.templateKey !== 'project') return

      const featuredImage = images.find(img => img.id.includes(node.frontmatter.featuredImage))
      const featuredOnProjectImage = images.find(img => img.id.includes(node.frontmatter.featuredOnProjectImage))
      const imagesNodeField = node.frontmatter.images.map(imageObj => ({
        ...imageObj,
        image: images.find(img => img.id.includes(imageObj.image)).id,
      }))

      createNodeField({
        node,
        name: 'featuredImage',
        value: featuredImage ? featuredImage.id : null,
      })

      createNodeField({
        node,
        name: 'featuredOnProjectImage',
        value: featuredOnProjectImage ? featuredOnProjectImage.id : null,
      })

      createNodeField({
        node,
        name: 'images',
        value: imagesNodeField,
      })
    })

    const { aboutNodeId, teamMemberNodeIds } = mds.reduce(
      (acc, node) =>
        node.frontmatter.templateKey.includes('about')
          ? { ...acc, aboutNodeId: node.id, aboutTeam:  getDataNode({ langCode, node }).team.map(item => item.teamMember) }
          : node.frontmatter.templateKey.includes('teamMember') && acc.aboutTeam.includes(node.frontmatter.title)
            ? { ...acc, teamMemberNodeIds: [...acc.teamMemberNodeIds, node.id] }
            : acc,
      { aboutNodeId: '', aboutTeam: [], teamMemberNodeIds: [] },
    )

    createNodeField({
      node: getNode(aboutNodeId),
      name: 'team',
      value: teamMemberNodeIds,
    })
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
