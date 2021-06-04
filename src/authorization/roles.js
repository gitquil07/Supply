export const RolesAuthority = {
    admin: {
        name: "ADMIN",
        allowRoute: false,
        useSupplyNavigation: true,
        useCustomNavigation: true,
        useTrackingNavigation: true,
        useUserNavigation: true
    },
    trackingAdmin: {
        name: "TRACKING_ADMIN",
        allowRoute: false,
        useSupplyNavigation: false,
        useCustomNavigation: false,
        useTrackingNavigation: true,
        useUserNavigation: true
    },
    customAdmin: {
        name: "CUSTOM_ADMIN",
        allowRoute: false,
        useSupplyNavigation: false,
        useCustomNavigation: true,
        useTrackingNavigation: false,
        useUserNavigation: true
    },
    supplyAdmin: {
        name: "SUPPLY_ADMIN",
        allowRoute: false,
        useSupplyNavigation: true,
        useCustomNavigation: false,
        useTrackingNavigation: false,
        useUserNavigation: true
    },
    tracking: {
        name: "TRACKING",
        allowRoute: false,
        useSupplyNavigation: false,
        useCustomNavigation: false,
        useTrackingNavigation: true,
        useUserNavigation: false
    },
    contractor: {
        name: "CONTRACTOR",
        allowRoute: false,
        useSupplyNavigation: false,
        useCustomNavigation: false,
        useTrackingNavigation: false,
        useUserNavigation: false
    },
    declarant: {
        name: "DECLARANT",
        allowRoute: false,
        useSupplyNavigation: false,
        useCustomNavigation: false,
        useTrackingNavigation: false,
        useUserNavigation: false
    }
}
