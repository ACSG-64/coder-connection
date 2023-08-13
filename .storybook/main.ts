const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-a11y',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/addon-styling',
        {
            name: '@storybook/addon-styling',
            options: {}
        }
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve!.plugins = [new TsconfigPathsPlugin()]
        return config;
   }
}
export default config