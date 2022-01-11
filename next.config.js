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
}
