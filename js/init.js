import { calculatePriceOrder, getMatrixValue, server } from "./index.js";
import { getAccountById } from "./listAccount.js";
import { getData, getId, saveData, setId } from "./storage.js";
import { validAvailableArea, validPayMoney } from "./valid.js";

export function initOrder() {
    const today = new Date();
    const avt = initAvt();
    const matrix = getMatrixValue();
    let orderCode = (Number(getId()) + 1);
    setId(orderCode);

    const orderWuwa = {
        "odc": String(getId()).padStart(2, "0"),
        "uid": document.querySelector('#inputUID').value,
        "level": document.querySelector('#inputLevel').value,
        "sever": server,
        "area": document.querySelector('#inputArea').value,
        "mapCount": document.querySelector('#inputMapCount').value,
        "quest": Number(document.querySelector('#inputQuest').value),
        "event": Number(document.querySelector('#inputEvent').value),
        "mapPrice": validAvailableArea().price,
        "timeCreate": {
            hour: String(today.getHours()).padStart(2, "0"),
            min: String(today.getMinutes()).padStart(2, "0"),
            sec: String(today.getSeconds()).padStart(2, "0")
        },
        "timeComplete": { hour: "", min: "", sec: "" },
        "dateCreate": {
            day: String(today.getDate()).padStart(2, "0"),
            month: String(today.getMonth() + 1).padStart(2, "0"),
            year: today.getFullYear()
        },
        "dateComplete": { day: "", month: "", year: "" },
        "listBoss": document.querySelector('#inputHolo').value.split(','),
        "account": getAccountById(Number(document.querySelector('#inputUID').value)),
        "avt": avt,
        "statePurchase": validPayMoney(),
        "matrix": { type: matrix.type, price: matrix.price },
        "version": getData('currentVersion'),
        "endGame" : document.querySelector('#input-end-game').value.split(",")
    }

    return orderWuwa;
}

export function initAvt() {
    const avt = [
        "../images/avt-order/Aalto.webp",
        "../images/avt-order/Aemeath.webp",
        "../images/avt-order/Augusta.webp",
        "../images/avt-order/Baizhi.webp",
        "../images/avt-order/Brant.webp",
        "../images/avt-order/Buling.webp",
        "../images/avt-order/Calcharo.webp",
        "../images/avt-order/Camellya.webp",
        "../images/avt-order/Cantarella.webp",
        "../images/avt-order/Carlotta.webp",
        "../images/avt-order/Cartethyia.webp",
        "../images/avt-order/Changli.webp",
        "../images/avt-order/Chisa.webp",
        "../images/avt-order/Chixia.webp",
        "../images/avt-order/Danjin.webp",
        "../images/avt-order/Denia.webp",
        "../images/avt-order/Encore.webp",
        "../images/avt-order/FRover.webp",
        "../images/avt-order/Galbrena.webp",
        "../images/avt-order/Hiyuki.webp",
        "../images/avt-order/Iuno.webp",
        "../images/avt-order/Jianxin.webp",
        "../images/avt-order/Jinhsi.webp",
        "../images/avt-order/Jiyan.webp",
        "../images/avt-order/Lingyang.webp",
        "../images/avt-order/Lucilla.webp",
        "../images/avt-order/Lucy.webp",
        "../images/avt-order/Lumi.webp",
        "../images/avt-order/Lupa.webp",
        "../images/avt-order/Luuk.webp",
        "../images/avt-order/Lynae.webp",
        "../images/avt-order/Mornye.webp",
        "../images/avt-order/Mortefi.webp",
        "../images/avt-order/MRover.webp",
        "../images/avt-order/Phoebe.webp",
        "../images/avt-order/Phrolova.webp",
        "../images/avt-order/Qiuyuan.webp",
        "../images/avt-order/Rebecca.webp",
        "../images/avt-order/Roccia.webp",
        "../images/avt-order/Sanhua.webp",
        "../images/avt-order/Shorekeeper.webp",
        "../images/avt-order/Sigrika.webp",
        "../images/avt-order/Suisui.webp",
        "../images/avt-order/Taoqi.webp",
        "../images/avt-order/Verina.webp",
        "../images/avt-order/Xuanling_YY.webp",
        "../images/avt-order/Yangyang.webp",
        "../images/avt-order/Yao.webp",
        "../images/avt-order/Yinlin.webp",
        "../images/avt-order/Youhu.webp",
        "../images/avt-order/Yuanwu.webp",
        "../images/avt-order/Zani.webp",
        "../images/avt-order/Zhezhi.webp",
        "../images/avt-order/Qingxiao.webp",
        "../images/avt-order/Jingran.webp",
        "../images/avt-order/Hsin.webp",
        "../images/avt-order/Suoming.webp"
    ]
    const index = Math.floor(Math.random() * avt.length);

    return avt[index];
}

export function initMap() {
    const areas = [
        { area: "không", totalMap: 0, price: 0 },
        { area: "Lahairoi", totalMap: 9, price: 10000 },
        { area: "Frostlands Surface", totalMap: 5, price: 10000 },
        { area: "Dimmr Plains", totalMap: 4, price: 10000 },
        { area: "Mengzhou", totalMap: 4, price: 20000 }
    ];
    
    return areas;
}

export function initListCustomer() {
    const customers = [
        {
            "customerId": "01",
            "avt": "../images/avt-customer/customer-1.webp",
            "name": "Bình Lê",
            "uid": "902970953",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "02",
            "avt": "../images/avt-customer/customer-2.webp",
            "name": "Nhất Thiên",
            "uid": "900053246",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "03",
            "avt": "../images/avt-customer/customer-3.webp",
            "name": "Lập Phát",
            "uid": "900867732",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "04",
            "avt": "../images/avt-customer/customer-4.webp",
            "name": "Tâm Thành",
            "uid": "900730942",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "05",
            "avt": "../images/avt-customer/customer-5.webp",
            "name": "Bích Châu",
            "uid": "900214018",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "06",
            "avt": "../images/avt-customer/customer-6.webp",
            "name": "Akari",
            "uid": "905064737",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "07",
            "avt": "../images/avt-customer/customer-7.webp",
            "name": "Sơn",
            "uid": "907300175",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "08",
            "avt": "../images/avt-customer/customer-8.webp",
            "name": "Trân",
            "uid": "905568232",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "09",
            "avt": "../images/avt-customer/customer-9.webp",
            "name": "Iroha",
            "uid": "900676857",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "10",
            "avt": "../images/avt-customer/customer-10.webp",
            "name": "Gia Bảo",
            "uid": "902801515",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        },
        {
            "customerId": "11",
            "avt": "../images/avt-customer/customer-11.webp",
            "name": "Trọng Nhân",
            "uid": "901361896",
            "level": "80",
            "sever": "SEA",
            "totalMoney": 0,
            "totalOrder": 0,
            "maxPrice": 0
        }
    ]

    return customers;
}

export function initBossHolo() {
    const listBoss = [
        // Tactical Hologram: Calamity
        { avt: "../images/tactical-hologram/Calamity/Tempest_Mephis.webp", bossName: "Mephis", bossInput: "Tempest Mephis" },
        { avt: "../images/tactical-hologram/Calamity/Impermanence_Heron.webp", bossName: "Heron", bossInput: "Impermanence Heron" },
        { avt: "../images/tactical-hologram/Calamity/Mourning_Aix.webp", bossName: "Aix", bossInput: "Mourning Aix" },
        { avt: "../images/tactical-hologram/Calamity/Feilian_Beringal.webp", bossName: "Beringal", bossInput: "Feilian Beringal" },
        { avt: "../images/tactical-hologram/Calamity/Crownless.webp", bossName: "Crownless", bossInput: "Crownless" },
        { avt: "../images/tactical-hologram/Calamity/Inferno_Rider.webp", bossName: "Inferno", bossInput: "Inferno Rider" },

        // Tactical Hologram: Phantom Pain
        { avt: "../images/tactical-hologram/Phantom_Pain/Fallacy.webp", bossName: "Fallacy", bossInput: "Fallacy" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Sentry_Construct.webp", bossName: "Sentry", bossInput: "Sentry Construct" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Hecate.webp", bossName: "Hecate", bossInput: "Hecate" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Dragon_of_Dirge.webp", bossName: "Dragon", bossInput: "Dragon of Dirge" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Lorelei.webp", bossName: "Lorelei", bossInput: "Lorelei" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Fleurdelys.webp", bossName: "Fleurdelys", bossInput: "Fleurdelys" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Kelpie.webp", bossName: "Kelpie", bossInput: "Kelpie" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Lady_of_the_Sea.webp", bossName: "Mya", bossInput: "Lady of the Sea" },
        { avt: "../images/tactical-hologram/Phantom_Pain/Lioness_of_Glory.webp", bossName: "Lioness", bossInput: "Lioness of Glory" },
        { avt: "../images/tactical-hologram/Phantom_Pain/The_False_Sovereign.webp", bossName: "Sovereign", bossInput: "The False Sovereign" },

        // Tactical Hologram: Synchronization
        { avt: "../images/tactical-hologram/Synchornization/Nameless_Explorer.webp", bossName: "Nameless", bossInput: "Nameless Explorer" },
        { avt: "../images/tactical-hologram/Synchornization/Sigillum.webp", bossName: "Sigillum", bossInput: "Sigillum" },
        { avt: "../images/tactical-hologram/Synchornization/Hyvatia.webp", bossName: "Hyvatia", bossInput: "Hyvatia" },
        { avt: "../images/tactical-hologram/Synchornization/Reactor_Husk.webp", bossName: "Husk", bossInput: "Reactor Husk" },
        { avt: "../images/tactical-hologram/Synchornization/Dreamless.webp", bossName: "Dreamless", bossInput: "Dreamless" },

        // Tactical Hologram: Sparring
        { avt: "../images/tactical-hologram/Sparring/Denia.webp", bossName: "Denia", bossInput: "Denia" },
        { avt: "../images/tactical-hologram/Sparring/Rustfire.webp", bossName: "Rustfire", bossInput: "Rustfire Chassis" }
    ]

    return listBoss;
}

export function initContentEndGame()
{
    return getData('endgameContent');
}

export function initFilterOrder() {
    const filterOrder = [
        { idFilter: '#filter-sp-y', callback: item => item.statePurchase === "Đã thanh toán" },
        { idFilter: '#filter-sp-n', callback: item => item.statePurchase === "Chưa thanh toán" },
        { idFilter: '#filter-event-quest', callback: item => item.event !== 0 || item.quest !== 0 },
        { idFilter: '#filter-matrix', callback: item => item.matrix.type !== "Không cần đánh" },
        { idFilter: '#filter-holo', callback: item => item.listBoss[0] !== "0" },
        {
            idFilter: '#filter-map', callback: item => item.area !== "không"
                && item.event === 0 && item.quest === 0
                && item.matrix.type === "Không cần đánh" && item.listBoss[0] === "0"
        }
    ];

    return filterOrder;
}

export function initSortedOrder() {
    const sortedOrder = [
        { idFilter: '#filter-price-asc', callback: (a, b) => calculatePriceOrder(a) - calculatePriceOrder(b) },
        { idFilter: '#filter-price-des', callback: (a, b) => calculatePriceOrder(b) - calculatePriceOrder(a) }
    ];

    return sortedOrder;
}

export function initIdRemoveError() {
    const listIdRemoveError = [
        "#errUID",
        "#errLevel",
        "#errSever",
        "#errPayMoney",
        "#errArea",
        "#errMapCount",
        "#errEvent",
        "#errMatrix",
        "#errQuest",
        "#errHolo",
        "#errCurrentVersion",
        "#errStatePurchase",
        "#errEndGame",
        "#errContent",
        "#errContentPrice",
        "#errContentUnit",
        "#errIconContent",
        "#errEdit",
        "#errEditMapCount"
    ];

    return listIdRemoveError;
}

export function initIdResetValue() {
    const listIdValue = [
        "#inputUID",
        "#inputLevel",
        "#inputArea",
        "#inputMapCount",
        "#inputEvent",
        "#inputMatrix",
        "#inputQuest",
        "#inputHolo",
        "#inputStatePurchase",
        "#input-end-game"
    ];

    return listIdValue;
}

export function initServer() {
    const servers = [
        { id: "#asia-sv", server: "Asia" },
        { id: "#sea-sv", server: "Sea" },
        { id: "#amc-sv", server: "American" },
        { id: "#eu-sv", server: "Europe" }
    ];

    return servers;
}

export function initContent()
{
    let listContent = [
        { iconContent: "../images/icon-content/quest.webp",nameContent: "Quest", priceContent: "10000", unitContent: "quest"  },
        { iconContent: "../images/icon-content/event.webp",nameContent: "Event", priceContent: "10000", unitContent: "event"  },
        { iconContent: "../images/icon-content/hologram.webp",nameContent: "Hologram" ,priceContent: "10000", unitContent: "boss"  },
        { iconContent: "../images/icon-content/toa.webp",nameContent: "ToA", priceContent: "free", unitContent: "run" },
        { iconContent: "../images/icon-content/whiwa.webp",nameContent: "Whiwa", priceContent: "free", unitContent: "run"  },
        { iconContent: "../images/icon-content/matrix.webp",nameContent: "Matrix 21k", priceContent: "10000", unitContent: "run"  },
        { iconContent: "../images/icon-content/matrix.webp",nameContent: "Matrix 37k", priceContent: "15000", unitContent: "run"  },
        { iconContent: "../images/icon-content/matrix.webp",nameContent: "Matrix 58k", priceContent: "20000", unitContent: "run"  }
    ]

    return listContent;

}