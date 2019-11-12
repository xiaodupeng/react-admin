const MenuList = [
    {
        title: '首页',
        key: "/admin/home",
        icon:'home'
    },
    {
        title: 'UI',
        key: '/admin/ui',
        icon:'pie-chart',
        children: [
            {
                title: '按钮',
                key: '/admin/ui/buttons',
            },
            {
                title: '父子传值',
                key: '/admin/ui/passValue',
            },
            {
                title: 'item',
                key: '/admin/ui/item',
                children:[
                    {
                        title: 'item1',
                        key: '/admin/ui/item1',
                    }
                ]
            }
        ]
    }
    
];
export default MenuList;