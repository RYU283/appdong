export const menuData = [
	{
		title: 'About Us',
		path: '', // 👈 링크를 제거합니다. (또는 이 줄 전체를 삭제해도 됩니다.)
		columns: [
			{
				links: [
					{ text: '동아리 소개', path: '/about-us/intro' },
					{ text: '활동 내용', path: '/about-us/activities' },
					{ text: '임원진', path: '/about-us/members' }
				]
			}
		]
	},
	{
		title: '자료실',
		path: '', // 👈 링크를 제거합니다.
		columns: [
			{
				links: [
					{ text: '스터디 자료', path: '/resources/study' },
					{ text: '프로젝트 결과물', path: '/resources/projects' }
				]
			}
		]
	},
	{
		title: '가입안내',
		path: '', // 👈 링크를 제거합니다.
		columns: [
			{
				links: [
					{ text: '모집 요강', path: '/accession' },
					{ text: '지원서 작성', path: '/accession/application' }
				]
			}
		]
	}
];