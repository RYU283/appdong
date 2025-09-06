export const menuData = [
	{
		title: 'About Us',
		path: '/aboutus',
		columns: [
			{
				links: [
					{ text: '소개', path: '/docs/introduction' },
					{ text: '조직도', path: '/docs/organization' },
					{ text: 'CI', path: '/docs/ci' },
					{ text: 'Contact', path: '/docs/contact' }
				]
			}
		]
	},
	{
		title: '자료실',
		path: '/datas',
		columns: [
			{
				links: [
					{ text: '공지사항', path: '/tutorial/activities' },
					{ text: '주요활동', path: '/tutorial/activities' },
					{ text: '학습기록', path: '/tutorial/study-logs' }
				]
			}
		]
	},
	{
		title: '가입안내',
		path: '/accession',
		columns: [
			{
				links: [
					{ text: '회칙', path: '/playground/rules' },
					{ text: '역대 임원', path: '/playground/history' },
					{ text: '캘린더', path: '/playground/calendar' }
				]
			}
		]
	}
];