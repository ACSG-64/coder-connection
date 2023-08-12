export class ProjectIdea {
    constructor(
        private readonly _name: string,
        private readonly _summary: string,
        private readonly _description: string,
        private readonly _tags: [string] | [] = []
    ) {
        // TODO: Formatting and validations
    }

    public get name(): string {
        return this._name.trim();
    }

    public get summary(): string {
        return this._summary.trim();
    }

    public get description(): string {
        return this._description.replace('#', '').trim();
    }

    public get readme(): string {
        const breakLine = '\n \n'
        const readme = `# ${this.name}`
            + breakLine
            + `_${this.summary}_`
            + breakLine
            + '# The idea'
            + breakLine
            + this.description
            + breakLine
            + '___'
            + breakLine
            + '_Created from CoderConnection website_'
        return readme
    }

    public get readmeBase64(): string {
        return Buffer.from(this.readme).toString('base64')
    }

    public get tags(): [string] | [] {
        return this._tags;
    }
}