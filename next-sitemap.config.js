/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.062embalagens.com.br',

	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				userAgent: '*',
				disallow: '/api/',
			},

		],
	},
};