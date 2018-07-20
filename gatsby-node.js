const path = require('path')

// we use sourceNodes instead of onCreateNode because
//  at this time plugins will have created all nodes already

exports.sourceNodes = ({ boundActionCreators: { createNodeField }, getNodes, getNode }) => {
  // iterate thorugh all markdown nodes to link page to works
  const { homeNodeId, workNodeIds } = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .reduce(
      (acc, node) =>
        node.frontmatter.templateKey && node.frontmatter.templateKey.includes('home')
          ? { ...acc, homeNodeId: node.id, homeWorks: node.frontmatter.works.map(item => item.work) }
          : node.frontmatter.templateKey &&
            node.frontmatter.templateKey.includes('work') &&
            acc.homeWorks.includes(node.frontmatter.title)
            ? { ...acc, workNodeIds: [...acc.workNodeIds, node.id] }
            : acc,
      { homeNodeId: '', homeWorks: [], workNodeIds: [] },
    )

  createNodeField({
    node: getNode(homeNodeId),
    name: 'works',
    value: workNodeIds,
  })

  const { aboutNodeId, aboutWorkers, workerNodeIds } = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .reduce(
      (acc, node) => {
        console.log({
          templateKey: node.frontmatter.templateKey,
          aboutWorkers: node.frontmatter.workers && node.frontmatter.workers.map(item => item.worker),
          title: node.frontmatter.title,
        })

        return node.frontmatter.templateKey && node.frontmatter.templateKey.includes('about')
          ? { ...acc, aboutNodeId: node.id, aboutWorkers: node.frontmatter.workers.map(item => item.worker) }
          : node.frontmatter.templateKey &&
            node.frontmatter.templateKey.includes('worker') &&
            acc.aboutWorkers.includes(node.frontmatter.title)
            ? { ...acc, workerNodeIds: [...acc.workerNodeIds, node.id] }
            : acc
      },
      { aboutNodeId: '', aboutWorkers: [], workerNodeIds: [] },
    )

  console.log({ aboutNodeId, aboutWorkers, workerNodeIds })

  createNodeField({
    node: getNode(aboutNodeId),
    name: 'workers',
    value: workerNodeIds,
  })
}

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          works: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "work" } } }) {
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

        result.data.works.edges.forEach(({ node: { frontmatter: work } }) => {
          createPage({
            path: path.join('work', work.slug),
            component: path.resolve('./src/templates/work.js'),
            context: {
              slug: work.slug,
            },
          })
        })
      }),
    )
  })
