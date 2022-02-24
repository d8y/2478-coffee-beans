const path = require('path')
module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/master-list',
                permanent: true,
            },
        ]
    },
    webpack: (config) => {
        config.resolve.alias['^@'] = path.resolve(__dirname, '../common')
        return config
    }
}
