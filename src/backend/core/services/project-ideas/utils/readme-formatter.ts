const br = '\n \n'
export function createReadme(
    title: string,
    summary: string,
    content: string,
    features: string[]
) {
    const _title = `# ${title}` + br
    const _summary = `_${summary}_` + br
    const _content = `## Proposal` + br + content + br
    let _features = `## Suggested features` + br
    features.forEach((feature) => (_features += `*  ${feature}` + br))
    const footer = '___' + br + '_From CoderConnection_'

    return _title + _summary + _content + _features + footer
}
