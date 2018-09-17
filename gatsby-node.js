const path = require('path')
const fs = require('fs')
const remark = require('remark')
const remarkHTML = require('remark-html')

const { defaultLanguage } = require('./gatsby-config.js').siteMetadata

const languages = fs.readdirSync('./src/content/languages').map(language => language.split('.')[0])

exports.onCreateNode = ({ node }) => {
  languages.forEach(lng => {
    ;['description', 'curriculum'].forEach(field => {
      if (
        node.frontmatter &&
        node.frontmatter.languages &&
        node.frontmatter.languages.find(({ language }) => language === lng)
      ) {
        const currentLangData = node.frontmatter.languages.find(({ language }) => language === lng)
        const nonCurrentLangData = node.frontmatter.languages.filter(
          ({ language }) => language !== currentLangData.language,
        )
        const updatedCurrentLangData = {
          ...currentLangData,
          [field]: remark()
            .use(remarkHTML)
            .processSync(currentLangData[field])
            .toString(),
        }

        node.frontmatter.languages = [updatedCurrentLangData, ...nonCurrentLangData]
      }
    })
  })

  return node
}

// we use sourceNodes instead of onCreateNode because
//  at this time plugins will have created all nodes already

const getDataNode = ({ node, langCode }) =>
  node.frontmatter && node.frontmatter.languages
    ? node.frontmatter.languages.find(({ language }) => language === langCode)
    : []

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
      (acc, node) => {
        const nodeData = getDataNode({ langCode, node })
        return node.frontmatter.templateKey.includes('home')
          ? {
              ...acc,
              homeNodeId: node.id,
              homeProjects: nodeData.projects.map(item => item.project),
            }
          : node.frontmatter.templateKey.includes('project') && acc.homeProjects.includes(node.frontmatter.title)
            ? { ...acc, projectNodeIds: [...acc.projectNodeIds, node.id] }
            : acc
      },
      { homeNodeId: '', homeProjects: [], projectNodeIds: [] },
    )

    if (projectNodeIds.length) {
      createNodeField({
        node: getNode(homeNodeId),
        name: 'projects',
        value: projectNodeIds,
      })
    }

    mds.forEach(node => {
      if (node.frontmatter.templateKey === 'project') {
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
      }
    })

    const { aboutNodeId, teamMemberNodeIds } = mds.reduce(
      (acc, node) => {
        const nodeData = getDataNode({ langCode, node })

        return node.frontmatter.templateKey.includes('about')
          ? {
              ...acc,
              aboutNodeId: node.id,
              aboutTeam: nodeData.team.map(item => item.teamMember),
            }
          : node.frontmatter.templateKey.includes('teamMember') && acc.aboutTeam.includes(node.frontmatter.title)
            ? { ...acc, teamMemberNodeIds: [...acc.teamMemberNodeIds, node.id] }
            : acc
      },
      { aboutNodeId: '', aboutTeam: [], teamMemberNodeIds: [] },
    )

    if (teamMemberNodeIds.length) {
      createNodeField({
        node: getNode(aboutNodeId),
        name: 'team',
        value: teamMemberNodeIds,
      })
    }
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
            path: `/project/${project.slug}`,
            component: path.resolve('./src/components/i18n/I18nRedirect.js'),
            context: {
              languages,
              defaultLanguage,
              language: null,
              routed: false,
              slug: project.slug,
              redirectPage: `/project/${project.slug}`,
            },
          })

          languages.forEach(language => {
            createPage({
              path: `/${language}/project/${project.slug}`,
              component: path.resolve('./src/templates/project.js'),
              context: {
                languages,
                defaultLanguage,
                language,
                routed: true,
                slug: project.slug,
                originalPath: path.join('project', project.slug),
              },
            })
          })
        })
      }),
    )
  })

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators

  return new Promise(resolve => {
    const redirectPage = {
      ...page,
      component: path.resolve('./src/components/i18n/I18nRedirect.js'),
      context: {
        languages,
        defaultLanguage,
        language: null,
        routed: false,
        redirectPage: page.path,
      },
    }

    deletePage(page)
    createPage(redirectPage)

    languages.forEach(language => {
      const localePage = {
        ...page,
        path: `/${language}${page.path}`,
        context: {
          languages,
          defaultLanguage,
          language,
          routed: true,
          originalPath: page.path,
        },
      }

      createPage(localePage)
    })

    resolve()
  })
}
