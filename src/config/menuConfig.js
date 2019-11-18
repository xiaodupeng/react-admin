const MenuList = [
    {
        title: '首页',
        key: "/home",
        icon:'home'
    },
    {
        title: 'UI',
        key: '/ui',
        icon:'pie-chart',
        children: [
            {
                title: '按钮',
                key: '/ui/buttons',
            },
            {
                title: '父子传值',
                key: '/ui/passValue',
            },
            {
                title: 'item',
                key: '/ui/item',
                children:[
                    {
                        title: 'item1',
                        key: '/ui/item/item1',
                    }
                ]
            }
        ]
    }
    
];
export default MenuList;