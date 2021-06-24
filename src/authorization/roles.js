const menuPermissions = {
    useSupplyNavigation: {
        main: true,
        order: true,
        application: true,
        arrived: true,
        customs: true,
        report: true,
        stockBalance: true,
        planProduct: true
    },
    useTrackingNavigation: {
        main: true,
        tracking: true,
        transport: true,
        arrived: true,
        clients: true,
        dept: true
    },
    useCustomNavigation: {
        main: true,
        new: true,
        ready: true,
        noDocument: true,
        noMoney: true,
        noTyped: true, 
        closed: true,
        certificate: true
    },
    useSettingNavigation: {
        main: true,
        firms: true,
        factories: true,
        users: true,
        products: true,
        materials: true,
        suppliers: true,
        vendorFactories: true,
        transports: true
    }
}

export const RolesAuthority = {
    admin: {
        name: "ADMIN",
        allowRoute: false,
        permissions: {
            menuPermissions:{
                ...menuPermissions
            }
        }
    },
    trackingAdmin: {
        name: "TRACKING_ADMIN",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useCustomNavigation: {
                    ...menuPermissions.useCustomNavigation,
                    main: false,
                    new: false,
                    ready: false,
                    noDocument: false,
                    noMoney: false,
                    noTyped: false, 
                    closed: false,
                    certificate: false
                },
                useSupplyNavigation: {
                    ...menuPermissions.useSupplyNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                }
            }
        }
    },
    customAdmin: {
        name: "CUSTOM_ADMIN",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useSupplyNavigation: {
                    ...menuPermissions.useSupplyNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                },
                useTrackingNavigation: {
                    ...menuPermissions.useTrackingNavigation,
                    main: false,
                    tracking: false,
                    transport: false,
                    arrived: false,
                    clients: false,
                    dept: false
                }
            }
        }
    },
    supplyAdmin: {
        name: "SUPPLY_ADMIN",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useCustomNavigation: {
                    ...menuPermissions.useCustomNavigation,
                    main: false,
                    new: false,
                    ready: false,
                    noDocument: false,
                    noMoney: false,
                    noTyped: false, 
                    closed: false,
                    certificate: false
                },
                useTrackingNavigation: {
                    ...menuPermissions.useTrackingNavigation,
                    main: true,
                    tracking: false,
                    transport: true,
                    arrived: true,
                    clients: false,
                    dept: false
                }
            }
        }
    },
    trackingSupply: {
        name: "TRACKING_SUPPLY",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useCustomNavigation: {
                    ...menuPermissions.useCustomNavigation,
                    main: false,
                    new: false,
                    ready: false,
                    noDocument: false,
                    noMoney: false,
                    noTyped: false, 
                    closed: false,
                    certificate: false
                },
                useSettingNavigation: {
                    ...menuPermissions.useSettingNavigation,
                    main: false,
                    firms: false,
                    factories: false,
                    users: false,
                    products: false,
                    materials: false,
                    suppliers: false,
                    vendorFactories: false,
                    transports: false
                }
            }
        }
     
    },
    tracking: {
        name: "TRACKING",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useCustomNavigation: {
                    ...menuPermissions.useCustomNavigation,
                    main: false,
                    new: false,
                    ready: false,
                    noDocument: false,
                    noMoney: false,
                    noTyped: false, 
                    closed: false,
                    certificate: false
                },
                useSupplyNavigation: {
                    ...menuPermissions.useSupplyNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                },
                useSettingNavigation: {
                    ...menuPermissions.useSettingNavigation,
                    main: false,
                    firms: false,
                    factories: false,
                    users: false,
                    products: false,
                    materials: false,
                    suppliers: false,
                    vendorFactories: false,
                    transports: false
                }
            }
        }
     
    },
    order: {
        name: "ORDER",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useCustomNavigation: {
                    ...menuPermissions.useCustomNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                },
                useTrackingNavigation: {
                    ...menuPermissions.useTrackingNavigation,
                    main: true,
                    tracking: false,
                    transport: true,
                    arrived: true,
                    clients: false,
                    dept: false
                },
                useSettingNavigation: {
                    ...menuPermissions.useSettingNavigation,
                    main: false,
                    firms: false,
                    factories: false,
                    users: false,
                    products: false,
                    materials: false,
                    suppliers: false,
                    vendorFactories: false,
                    transports: false
                }
            }
        }
    },
    contractor: {
        name: "CONTRACTOR",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useSupplyNavigation: {
                    ...menuPermissions.useSupplyNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                },
                useTrackingNavigation: {
                    ...menuPermissions.useTrackingNavigation,
                    main: false,
                    tracking: false,
                    transport: false,
                    arrived: false,
                    clients: false,
                    dept: false
                },
                 useSettingNavigation: {
                ...menuPermissions.useSettingNavigation,
                main: false,
                firms: false,
                factories: false,
                users: false,
                products: false,
                materials: false,
                suppliers: false,
                vendorFactories: false,
                transports: false
            }
            }
        }
    },
    declarant: {
        name: "DECLARANT",
        allowRoute: false,
        permissions: {
            menuPermissions: {
                ...menuPermissions,
                useSupplyNavigation: {
                    ...menuPermissions.useSupplyNavigation,
                    main: false,
                    order: false,
                    application: false,
                    arrived: false,
                    customs: false,
                    report: false,
                    stockBalance: false,
                    planProduct: false
                },
                useTrackingNavigation: {
                    ...menuPermissions.useTrackingNavigation,
                    main: false,
                    tracking: false,
                    transport: false,
                    arrived: false,
                    clients: false,
                    dept: false
                },
                useSettingNavigation: {
                    ...menuPermissions.useSettingNavigation,
                    main: false,
                    firms: false,
                    factories: false,
                    users: false,
                    products: false,
                    materials: false,
                    suppliers: false,
                    vendorFactories: false,
                    transports: false
                }
            }
        }
    }
}
