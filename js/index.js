import { saveData, getData, setId } from "./storage.js";
import {
    renderCompleteListOrder,
    renderProgressListOrder,
    renderDetailOrder,
    renderOverView,
    renderOverviewOrder,
    renderHomePage,
    renderListCustomer,
    renderDetailCustomer,
    renderListMap,
    renderServicePrice,
    renderFilterByCondition,
    renderContent,
    renderFormType,
    renderContentEndGame,
} from "./render.js";
import { pagination } from "./pagination.js";
import { getAccountById, initListAccount } from "./listAccount.js";
import {
    initOrder,
    initMap,
    initListCustomer,
    initIdRemoveError,
    initIdResetValue,
    initServer,
    initContent,
    initBossHolo,
} from "./init.js";
import {
    validLevel,
    validUID,
    validEmptyValue,
    validInput,
    validAvailableArea
} from "./valid.js";

const initValue = () => {
    saveData('totalOrder', 0);
    saveData('progressListOrder', "");
    saveData('initWuwa', "");
    setId(0);
    saveData('completeOrder', "");
    saveData('listCustomer', "");
    saveData('maxPrice', 0);
    saveData('totalMoney', 0);
    saveData('currentVersion', "");
}
if (getData('initWuwa') === null)
    initValue();

if (getData('content') === null)
    saveData('content', initContent());

if (getData('map') === null)
    saveData('map', initMap());

export function showErrInputById(errId, msg) {
    document.querySelector(errId).innerText = msg
    return false;
}

export function removeErrById(params) {
    document.querySelector(params).innerHTML = "";
    return true;
}

function resetValue(params) {
    document.querySelector(params).value = "";
}

export function hideModal(modalId) {
    bootstrap.Modal.getOrCreateInstance(
        document.querySelector(modalId)
    ).hide();
}

export let server = "";
if (server === "") document.querySelector('.display-sever').innerHTML = "Chưa chọn server";

document.querySelector('#slt-sever')
    .addEventListener('click', (e) => {
        initServer().forEach(f => {
            if (e.target.closest(f.id))
                server = f.server;
            if (server !== "") document.querySelector('.display-sever').innerHTML = server;
        })
    })

document.querySelector('#inputUID').addEventListener('blur', validUID);
document.querySelector('#inputLevel').addEventListener('blur', validLevel);


export function getMatrixValue() {
    const inputValue = document.querySelector('#inputMatrix').value;
    const matrix = { type: "", price: "" };
    const listMatrixReward = [
        { reward: "0", price: 0, type: "Không cần đánh" },
        { reward: "21k", price: 10e3, type: "Full mốc đá" },
        { reward: "37k", price: 15e3, type: "Full mốc đá và tune" },
        { reward: "58k", price: 20e3, type: "Full mốc thưởng" }
    ]
    const foundRewardMatrix = listMatrixReward.find(item => item.reward === inputValue);

    if (foundRewardMatrix) {
        matrix.type = foundRewardMatrix.type;
        matrix.price = foundRewardMatrix.price;
    }
    return matrix;
}

export function calculatePriceOrder(order) {
    let listContentPrice = 0;
    let endGameList = getData('endgameContent');

    if (Number(order.listBoss[0]) !== 0) listContentPrice += Number(order.listBoss.length) * 10e3;
    if (Number(order.endGame[0]) !== 0) {
        order.endGame.forEach(el => {
            let foundContent = endGameList.find(item => item.nameContent === el);
            listContentPrice += (foundContent.priceContent === "free") ? 0 : Number(foundContent.priceContent);
        })
    }

    // mỗi event và quest 10k, map thì tùy vào khu vực
    const totalPrice = Number(order.mapCount) * Number(order.mapPrice) +
        Number(order.quest) * 10e3 + Number(order.event) * 10e3 +
        Number(order.matrix.price) + listContentPrice;

    return totalPrice;
}

export function showNotice(msg) {
    const toastShow = document.querySelector('#toast-custom');

    toastShow.classList.add('show-toast');

    toastShow.innerHTML =
        `<div class="toast-content ">
        <p class="p-0 m-0">
            ${msg}
        </p>
    </div>`;
    setTimeout(() => {
        toastShow.classList.remove('show-toast');
    }, 1800);
}

function displayRealTime() {
    const days = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy"
    ];
    let date = String(new Date().getDate()).padStart(2, "0");
    let month = String(Number(new Date().getMonth() + 1)).padStart(2, "0");
    let year = String(new Date().getFullYear()).padStart(2, "0");

    let hour = String(new Date().getHours()).padStart(2, "0");
    let min = String(new Date().getMinutes()).padStart(2, "0");
    let sec = String(new Date().getSeconds()).padStart(2, "0");

    document.querySelector('#real-time').innerHTML = `
        <div class=" p-2 h-100 text-white">
            <div class="text-end">
                <p class="fs-3 m-0">${hour}:${min}:${sec}</p>
                <p class="fs-5 m-0">${days[new Date().getDay()]}, ${date} / ${month} / ${year}</p>
            </div>
        </div>
    `
}
setInterval(displayRealTime, 1000);

function calculateRatioCompleteOrder() {
    let completeRate = (Number(getData('completeOrder').length) / getData('totalOrder')) * 100;
    if (!completeRate) document.querySelector('#complete-rate').innerHTML = "0%";
    else if (completeRate - Math.trunc(completeRate) === 0) document.querySelector('#complete-rate').innerHTML = `${completeRate}%`;
    else document.querySelector('#complete-rate').innerHTML = `${completeRate.toFixed(2)}%`;
}

function renderTab(element, parrentNode, tabBackground, tabText) {
    const parent = document.querySelectorAll(parrentNode);
    const text = element.querySelector('span');

    parent.forEach(el => {
        el.classList.remove('.nav-item', tabBackground);
        el.querySelector('span').classList.remove(tabText);
    })

    element.classList.add(tabBackground);
    text.classList.add(tabText);
}

document.querySelectorAll('.dashboard-element').forEach(element => {
    element.addEventListener('click', () => {
        element.classList.remove('dashboard-ignore');
        renderTab(element, '.dashboard-element', 'active-list', 'active-text');
    });
});

function displayHomePage() {
    displayRealTime();
    let listCustomer = getData('listCustomer') || initListCustomer();

    let isExistField = true;
    listCustomer.forEach(item => {
        if (item.tier === undefined)
            isExistField = false;
    });
    if (!isExistField) {
        listCustomer = listCustomer.map(item => ({
            ...item,
            "tier": ""
        }));
        saveData('listCustomer', listCustomer);
        isExistField = true;
    }

    listCustomer.forEach(item => {
        if (isExistField) {
            if (item.totalOrder === 0 || item.totalOrder <= 3)
                item.tier = "Khách Mới";
            else if (item.totalOrder < 8)
                item.tier = "Khách Thường";
            else
                item.tier = "Khách Vip";
        }
    })
    saveData('listCustomer', listCustomer);

    document.querySelectorAll('#order-overview')
        .forEach(e => e.innerHTML = "");

    const totalMoney = listCustomer.reduce((a, b) => {
        return a + Number(b.totalMoney)
    }, 0);
    saveData('totalMoney', totalMoney);

    document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');

    document.querySelector('#order-overview').innerHTML = renderOverView().home;
    document.querySelector('#display').innerHTML = renderHomePage();
    pagination(getData, 'listCustomer', renderListCustomer, '#list-order', '#pagination',
        { btnPrev: 'btn-prev-home', btnNext: 'btn-next-home' }
    );

    document.querySelector('#total-customer').innerHTML = initListAccount().length;
    document.querySelector('#max-price').innerHTML = Number(getData('maxPrice')).toLocaleString(0) + " đ";
    document.querySelector('#total-money').innerHTML = getData('totalMoney').toLocaleString(0) + " đ";

    document.querySelectorAll('.tabs-element').forEach(element => {
        element.addEventListener('click', () => {
            renderTab(element, '.tabs-element', 'tab-list', 'tab-title');
        });
    });

    document.querySelector('.tab-render').addEventListener('click', e => {
        document.querySelectorAll('.tabs-element').forEach(el => {
            el.classList.add('tab-ignore')
        });
        if (e.target.closest('.tab-list').classList.contains('tab-list'))
            e.target.closest('.tab-list').classList.remove('tab-ignore');
    });

} displayHomePage();

document.querySelectorAll('.tabs-element').forEach(element => {
    element.addEventListener('click', () => {
        renderTab(element, '.tabs-element', 'tab-list', 'tab-title');
    });
});

document.querySelector('.tab-render').addEventListener('click', e => {
    document.querySelectorAll('.tabs-element').forEach(el => {
        el.classList.add('tab-ignore')
    });
    if (e.target.closest('.tab-list').classList.contains('tab-list'))
        e.target.closest('.tab-list').classList.remove('tab-ignore');
});

document.querySelector('#home').addEventListener('click', () => {
    document.querySelector('#list-order').classList.remove('is-filter');
    displayHomePage();
});

document.querySelector('#display').addEventListener('click', e => {
    const current = e.target;
    if (current.closest('#customer-list')) {
        pagination(getData, 'listCustomer', renderListCustomer, '#list-order', '#pagination',
            { btnPrev: 'btn-prev-home', btnNext: 'btn-next-home' }
        );
    }
    if (current.closest('#list-price-service')) {
        const listMap = getData('map');
        const nameMap = listMap.filter(item => item.area !== "không");
        saveData('listMap', nameMap);
        let initListContent = getData('content');

        document.querySelector('#list-order').innerHTML = renderServicePrice();
        let listContent = initListContent.slice(0, 3);
        let html = "";

        listContent.forEach(el => {
            html += renderContent(el);
        })

        document.querySelector('#content-container').innerHTML = html;
        document.querySelector('#pagination').innerHTML = "";
        pagination(
            getData, 'listMap',
            renderListMap, '.map-content', '.map-pagination',
            { pageSlide: 6, returnHead: false, btnPrev: 'btn-prev-map', btnNext: 'btn-next-map', slidePage: 'slideMap' }
        );
    }
})



// render các đơn đang cày
document.querySelector('#progress-order').addEventListener('click', () => {
    document.querySelector('#list-order').classList.remove('is-filter');
    let progressListOrder = Object.values(getData('progressListOrder'));

    const renderListFilterOrder = renderFilterByCondition().progress;
    document.querySelector('#order-overview')
        .innerHTML = renderOverView().order;
    renderOverviewOrder(getData, calculateRatioCompleteOrder);
    document.querySelector('#display')
        .innerHTML =
        `
        <div class="d-flex justify-content-between mt-3 align-items-center">
            <div class="d-flex">
                <div id="progress-button">
                    <h5 class="fw-bold gap-2 cursor d-flex align-items-center badge-title-progress m-0 p-2 text-white">
                        <iconify-icon icon="thesvg:progress"></iconify-icon>    
                        Các đơn đang cày
                    </h5>
                </div>
                <div>
                    ${renderListFilterOrder}
                </div>
            </div>
            <div class="me-2">
                <h5 id="update-state-purchase" class="fw-bold cursor 
                badge-title-update m-0 p-2 text-white
                d-flex align-items-center gap-2"
                data-bs-toggle="modal" data-bs-target="#modalUpdateStatePurchase">
                    <iconify-icon icon="icon-park-outline:change"></iconify-icon> 
                    Sửa trạng thái thanh toán
                </h5>
            </div>
        </div>
    `;
    document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');

    if (progressListOrder.length === 0) {
        document.querySelector('.wrapper-scroll').classList.remove('wrapper-custom');
        document.querySelector('#list-order')
            .innerHTML = `
                <div class="empty-list pt-5">
                    <div class="h-100">
                        <div class="empty-icon">
                            <div class="icon-custom d-flex justify-content-center">
                                <img src="../images/logo/Mint.webp" class="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="row h-100">
                        <div class="empty-title text-uppercase text-center">
                            <h2>
                                <span>&mdash;&mdash;</span>
                                <span>&diamond;</span>
                                chưa có đơn nào
                                <span>&diamond;</span>
                                <span>&mdash;&mdash;</span>
                            </h2>
                        </div>
                        <div class="empty-content text-uppercase text-center">
                            <h4>
                                hiện chưa có đơn nào đang được xử lý
                            </h4>
                            <h4>
                                Các đơn đang cày sẽ được hiển thị tại đây
                            </h4>
                        </div>
                        <div class="empty-footer text-center">
                            <h4>
                                <span>&mdash;&mdash;</span>
                                <span>&diamond;</span>
                                <span>&mdash;&mdash;</span>
                            </h4>
                        </div>
                    </div>
                </div>
            `;
        document.querySelector('#pagination').innerHTML = "";
    }
    else {
        pagination(getData, 'progressListOrder', renderProgressListOrder, '#list-order', '#pagination',
            { btnPrev: 'btn-prev-progress', btnNext: 'btn-next-progress' }
        );
    }
})

// render các đơn đã hoàn thành
document.querySelector('#complete-order').addEventListener('click', () => {
    document.querySelector('#list-order').classList.remove('is-filter');
    document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');

    const renderListFilterOrder = renderFilterByCondition().complete;
    document.querySelector('#order-overview')
        .innerHTML = renderOverView().order;
    renderOverviewOrder(getData, calculateRatioCompleteOrder);
    document.querySelector('#display').innerHTML =
        `
        <div class="d-flex mt-3 align-items-center">
            <div>
                <h5 id="complete-button" class="badge-title-complete cursor p-2 m-0 fw-bold text-white p-2">
                    <i class="bi bi-check-circle me-1"></i>
                    Các đơn đã hoàn thành
                </h5>
            </div>
            <div>
                ${renderListFilterOrder}
            </div>
        </div>
    `;

    let completeListOrder = getData('completeOrder') ?? [];

    if (completeListOrder.length === 0) {
        document.querySelector('.wrapper-scroll').classList.remove('wrapper-custom');
        document.querySelector('#list-order')
            .innerHTML = `
                <div class="empty-list pt-5">
                    <div class="h-100">
                        <div class="empty-icon">
                            <div class="icon-custom d-flex justify-content-center">
                                <img src="../images/logo/Mint.webp" class="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="row h-100">
                        <div class="empty-title text-uppercase text-center">
                            <h2>
                                <span>&mdash;&mdash;</span>
                                <span>&diamond;</span>
                                chưa có đơn nào
                                <span>&diamond;</span>
                                <span>&mdash;&mdash;</span>
                            </h2>
                        </div>
                        <div class="empty-content text-uppercase text-center">
                            <h4>
                                hiện chưa có đơn nào hoàn thành
                            </h4>
                            <h4>
                                Các đơn đã hoàn thành sẽ được hiển thị tại đây
                            </h4>
                        </div>
                        <div class="empty-footer text-center">
                            <h4>
                                <span>&mdash;&mdash;</span>
                                <span>&diamond;</span>
                                <span>&mdash;&mdash;</span>
                            </h4>
                        </div>
                    </div>
                </div>
            `;
        document.querySelector('#pagination').innerHTML = "";
    }
    else {
        saveData('completeOrder', completeListOrder.sort((a, b) => a.odc - b.odc))
        pagination(getData, 'completeOrder', renderCompleteListOrder, '#list-order', '#pagination',
            { btnPrev: 'btn-prev-complete', btnNext: 'btn-next-complete' }
        );
    }
})


// xử lý phần nút hoàn thành và nút chi tiết
document.querySelector('#list-order')
    .addEventListener('click', e => {
        let listProgressOrder = getData('progressListOrder') ?? [];
        let completeListOrder = Object.values(getData('completeOrder')) ?? [];
        let allOrders = [...listProgressOrder, ...completeListOrder];

        if (e.target.closest('.btn-complete-order')) {
            const id = Number(e.target.closest('.btn-complete-order').dataset.id);
            const today = new Date();

            // lấy danh sách các đơn đang trong quá trình hoàn thành
            let progressOrder = listProgressOrder.filter(item => Number(item.odc) !== id);
            document.querySelector('#list-order').innerHTML = "";
            saveData('progressListOrder', progressOrder);
            saveData('progressOrder', progressOrder.length);

            // lấy các đơn đã hoàn thành 
            let getListCustomer = getData('listCustomer');
            let completeOrder = listProgressOrder.find(item => Number(item.odc) === id);

            let customerIndex = getListCustomer.findIndex(item => Number(item.uid) === Number(completeOrder.uid));
            if (completeOrder) {
                completeOrder.statePurchase = 'Đã thanh toán';
                getListCustomer[customerIndex].maxPrice = (
                    calculatePriceOrder(completeOrder) > getListCustomer[customerIndex].maxPrice
                ) ? calculatePriceOrder(completeOrder) : getListCustomer[customerIndex].maxPrice;

                if (getListCustomer[customerIndex].maxPrice >= Number(getData('maxPrice'))) {
                    saveData('maxPrice', getListCustomer[customerIndex].maxPrice);
                }

                getListCustomer[customerIndex].totalMoney += calculatePriceOrder(completeOrder) || 0;
                getListCustomer[customerIndex].totalOrder += 1 || 0;
                saveData('listCustomer', getListCustomer);

                completeOrder.timeComplete.hour = String(today.getHours()).padStart(2, "0");
                completeOrder.timeComplete.min = String(today.getMinutes()).padStart(2, "0");
                completeOrder.timeComplete.sec = String(today.getSeconds()).padStart(2, "0");

                completeOrder.dateComplete.day = String(today.getDate()).padStart(2, "0");
                completeOrder.dateComplete.month = String(Number(today.getMonth() + 1)).padStart(2, "0");
                completeOrder.dateComplete.year = String(today.getFullYear()).padStart(2, "0");
            }

            completeListOrder.push(completeOrder);
            saveData('completeOrder', completeListOrder);

            document.querySelector('#progress-task').innerHTML = `${getData('progressOrder')}`;
            document.querySelector('#complete-task').innerHTML = `${getData('completeOrder').length}`;
            calculateRatioCompleteOrder();

            if (getData('progressListOrder').length === 0) {
                document.querySelector('.wrapper-scroll').classList.remove('wrapper-custom');
                document.querySelector('#progress-task').innerHTML = "0";
                document.querySelector('#list-order')
                    .innerHTML = `
                    <div class="empty-list pt-5">
                        <div class="h-100">
                            <div class="empty-icon">
                                <div class="icon-custom d-flex justify-content-center">
                                    <img src="../images/logo/Mint.webp" class="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div class="empty-title text-uppercase text-center">
                                <h2>
                                    <span>&mdash;&mdash;</span>
                                    <span>&diamond;</span>
                                    chưa có đơn nào
                                    <span>&diamond;</span>
                                    <span>&mdash;&mdash;</span>
                                </h2>
                            </div>
                            <div class="empty-content text-uppercase text-center">
                                <h4>
                                    hiện chưa có đơn nào đang được xử lý
                                </h4>
                                <h4>
                                    Các đơn đang cày sẽ được hiển thị tại đây
                                </h4>
                            </div>
                            <div class="empty-footer text-center">
                                <h4>
                                    <span>&mdash;&mdash;</span>
                                    <span>&diamond;</span>
                                    <span>&mdash;&mdash;</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('#pagination').innerHTML = "";
            }
            else if (document.querySelector('#list-order').classList.contains('is-filter')) {
                let currentList = getData('currentList');
                currentList = currentList.filter(el => Number(el.odc) !== id);
                saveData('currentList', currentList);


                if (getData('currentList').length === 0) {
                    document.querySelector('.wrapper-scroll').classList.remove('wrapper-custom');
                    document.querySelector('#list-order')
                        .innerHTML = `
                    <div class="empty-list pt-5">
                        <div class="h-100">
                            <div class="empty-icon">
                                <div class="icon-custom d-flex justify-content-center">
                                    <img src="../images/logo/Mint.webp" class="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div class="empty-title text-uppercase text-center">
                                <h2>
                                    <span>&mdash;&mdash;</span>
                                    <span>&diamond;</span>
                                    chưa có đơn nào
                                    <span>&diamond;</span>
                                    <span>&mdash;&mdash;</span>
                                </h2>
                            </div>
                            <div class="empty-content text-uppercase text-center">
                                <h4>
                                    hiện chưa có đơn nào phù hợp
                                </h4>
                                <h4>
                                    Các đơn đã lọc sẽ được hiển thị tại đây
                                </h4>
                            </div>
                            <div class="empty-footer text-center">
                                <h4>
                                    <span>&mdash;&mdash;</span>
                                    <span>&diamond;</span>
                                    <span>&mdash;&mdash;</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                `;
                    document.querySelector('#pagination').innerHTML = "";
                }
                else {
                    document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');
                    pagination(getData, 'currentList', renderProgressListOrder, '#list-order', '#pagination');
                }
            }
            else {
                document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');
                pagination(getData, 'progressListOrder', renderProgressListOrder, '#list-order', '#pagination');
            }
        }


        if (e.target.closest('.btn-detail-order')) {
            const id = Number(e.target.closest('.btn-detail-order').dataset.id);
            let newArr = allOrders.find(item => Number(item.odc) === id);
            document.querySelector('#detail-order').innerHTML = renderDetailOrder(newArr, String(id).padStart(2, "0"));
        }

        if (e.target.closest('.btn-detail-customer')) {
            const listCustomer = getData('listCustomer');
            const customerId = e.target.closest('.btn-detail-customer').dataset.id;
            const getCustomer = listCustomer.find(e => Number(e.customerId) === Number(customerId))
            const account = getAccountById(Number(getCustomer.uid));

            document.querySelector('#customer-detail')
                .innerHTML = renderDetailCustomer(getCustomer, account);
        }
    })

document.querySelector('#btn-save-order').addEventListener('click', () => {
    if (!validInput()) return;
    const orderWuwa = initOrder();

    let listOrder = Object.values(getData('initWuwa')) || [];
    listOrder.push(orderWuwa);

    let progressListOrder = Object.values(getData('progressListOrder')) || [];
    progressListOrder.push(orderWuwa);

    saveData('initWuwa', listOrder);
    saveData('totalOrder', listOrder.length);
    saveData('progressListOrder', progressListOrder);

    server = "";
    document.querySelector('.display-sever').innerHTML = "Chưa chọn server";
    document.querySelector('#inputMapCount').classList.remove('custom-disabled');
    document.querySelector('#inputMapCount').disabled = false;
    document.querySelector('#form-create-order').reset();
    hideModal('#modalOrderId');
    showNotice('Đã thêm đơn thành công!');
})

document.querySelector('#btn-delete-order').addEventListener('click', () => {

    let isValid = true;
    let isNumberId = true;

    const inputDeletedId = document.querySelector('#inputDeleteId').value;
    const listDeletedId = inputDeletedId.split(', ');
    let isExist = getData('initWuwa') ? true : false;

    listDeletedId.forEach(el => {
        if (!Number(el)) {
            isNumberId = false;
        }
    })

    if (inputDeletedId.length === 0) {
        showErrInputById('#errDelete', 'Chưa điền ID cần xóa');
        isValid = false;
    }
    else if (isExist && !getData('initWuwa').find(item => Number(item.odc) === Number(inputDeletedId))) {
        showErrInputById('#errDelete', `Không tìm thấy đơn phù hợp`);
        isValid = false;
    }
    else if (!isNumberId) {
        showErrInputById('#errDelete', 'Yêu cầu ID là số');
        isValid = false;
    }
    else if (!isExist) {
        showErrInputById('#errDelete', 'Không còn đơn nào để xóa');
        isValid = false;
    }

    if (!isValid) return;

    let listProgressOrder = getData('progressListOrder') ?? [];
    let completeListOrder = Object.values(getData('completeOrder')) ?? [];

    listDeletedId.forEach(el => {
        let indexProgress = listProgressOrder.findIndex(item => Number(item.odc) === Number(el));

        if (indexProgress !== -1) {
            listProgressOrder = listProgressOrder.filter(order => Number(order.odc) !== Number(el));
            saveData('progressListOrder', listProgressOrder);
            saveData('progressOrder', listProgressOrder.length)
        }

        let deletedCompleteOrder = completeListOrder.find(item => Number(item.odc) === Number(el));

        if (deletedCompleteOrder) {
            const listCustomer = getData('listCustomer');
            const customerIndex = listCustomer.findIndex(item => Number(item.uid) === Number(deletedCompleteOrder.uid));
            let totalMoney = getData('totalMoney');

            listCustomer[customerIndex].totalOrder -= 1;
            listCustomer[customerIndex].totalMoney -= calculatePriceOrder(deletedCompleteOrder);

            if (listCustomer[customerIndex].totalOrder === 0)
                listCustomer[customerIndex].maxPrice = 0;

            totalMoney -= calculatePriceOrder(deletedCompleteOrder);

            saveData('listCustomer', listCustomer);
            saveData('totalMoney', totalMoney);
            if (getData('totalMoney') === 0) {
                saveData('maxPrice', 0);
                document.querySelector('#max-price').innerHTML = Number(getData('maxPrice')).toLocaleString(0) + " đ"
                document.querySelector('#total-money').innerHTML = getData('totalMoney').toLocaleString(0) + " đ"
            }

            completeListOrder = completeListOrder.filter(order => Number(order.odc) !== Number(el));
            saveData('completeOrder', completeListOrder);
            if (completeListOrder.length !== 0) {
                let sortOrder = completeListOrder
                    .sort((a, b) =>
                        calculatePriceOrder(b) - calculatePriceOrder(a)
                    )[0];

                const currentMaxPrice = calculatePriceOrder(sortOrder)

                saveData('maxPrice', currentMaxPrice);
            }

            document.querySelector('#max-price').innerHTML = Number(getData('maxPrice')).toLocaleString(0) + " đ"
            document.querySelector('#total-money').innerHTML = getData('totalMoney').toLocaleString(0) + " đ"
        }

        let allOrders = [...listProgressOrder, ...completeListOrder];
        saveData('initWuwa', allOrders);
        saveData('totalOrder', allOrders.length);

        removeErrById('#errDelete');
        document.querySelector('#inputDeleteId').value = "";
        hideModal('#modalDeleteOrderId');
        showNotice('Đã xóa đơn thành công!');
    })
})

document.querySelector('#btn-not-delete-order')
    .addEventListener('click', () => {
        removeErrById('#errDelete');
        document.querySelector('#inputDeleteId').value = "";
    })

export function copyIntoClipBoard(parentClass, copyClass, btnCopy) {
    const text = parentClass.querySelector(copyClass).innerText;
    btnCopy.innerHTML = `<i class="bi bi-clipboard-check"></i>`
    setTimeout(() => {
        btnCopy.innerHTML = `<i class="bi bi-clipboard"></i>`
    }, 1000);
    btnCopy.blur();
    navigator.clipboard.writeText(text);
}

document.querySelector('#currentVersion')
    .innerHTML = (getData('currentVersion') !== "") ?
        ("version: " + getData('currentVersion')) : "Chưa cập nhật";


document.querySelector('#btn-update-version')
    .addEventListener('click', () => {
        let isValid = true;
        const inputCurrentVersion = document.querySelector('#inputCurrentVersion').value;

        if (inputCurrentVersion === "") {
            validEmptyValue('#inputCurrentVersion', '#errCurrentVersion');
            isValid = false;
        }
        else if (Number(inputCurrentVersion) < getData('currentVersion')) {
            showErrInputById('#errCurrentVersion', 'Phiên bản hiện tại không hợp lệ');
            isValid = false;
        }

        if (!isValid) return;
        saveData('currentVersion', Number(inputCurrentVersion));
        document.querySelector('#currentVersion')
            .innerHTML = "version: " + getData('currentVersion');

        document.querySelector('#cr-version')
            .innerHTML = `${getData('currentVersion')}`

        showNotice('Cập nhập phiên bản thành công!');
        document.querySelector('#formVersion').reset();
        removeErrById('#errCurrentVersion');
        hideModal('#modalUpdateVersion');
    });

document.querySelector('#update-version').addEventListener('click', () => {
    removeErrById('#errCurrentVersion');
});

document.querySelector('#inputArea')
    .addEventListener('blur', () => {
        const inputArea = document.querySelector('#inputArea').value;
        let inputMapCount = document.querySelector('#inputMapCount');

        if (inputArea.trim().toLowerCase() === "không") {
            inputMapCount.value = "0";
            inputMapCount.disabled = true;
            inputMapCount.classList.add('custom-disabled');
        }
        else {
            inputMapCount.value = "";
            inputMapCount.disabled = false;
            inputMapCount.classList.remove('custom-disabled');
        }
    })

document.querySelector('#btn-cancel-order')
    .addEventListener('click', () => {
        initIdRemoveError().forEach(e => removeErrById(e));
        initIdResetValue().forEach(e => resetValue(e));
        document.querySelectorAll('input[type="radio"]')
            .forEach(e => e.checked = false);
        if (document.querySelector('#inputArea')
            .value.trim().toLowerCase() === "") {
            document.querySelector('#inputMapCount').disabled = false;
            document.querySelector('#inputMapCount').classList.remove('custom-disabled');
        }

        server = "";
        document.querySelector('.display-sever').innerHTML = "Chưa chọn server";
    })

document.querySelector('#btn-state-purchase')
    .addEventListener('click', () => {

        let isValid = true;

        if (!validEmptyValue('#inputStatePurchase', '#errStatePurchase'))
            return;
        const inputValue = document.querySelector('#inputStatePurchase').value.split(', ');
        let progressList = getData('progressListOrder');

        inputValue.forEach(e => {
            const foundOrder = progressList.find(pl => pl.odc === e);
            foundOrder.statePurchase = "Đã thanh toán";
            isValid = foundOrder ? true : false;
        });

        if (!isValid) return showErrInputById('#errStatePurchase', "có id không tồn tại");
        else {
            initIdRemoveError().forEach(e => removeErrById(e));
            initIdResetValue().forEach(e => resetValue(e));
            progressList = progressList.filter(item => item.statePurchase === "Đã thanh toán"
                || item.statePurchase === "Chưa thanh toán");
            saveData('progressListOrder', progressList);

            showNotice('Cập nhật trạng thái thành công');
            pagination(getData, 'progressListOrder', renderProgressListOrder, '#list-order', '#pagination');
        }

        hideModal('#modalUpdateStatePurchase');
    });

document.querySelector('.form-list')
    .addEventListener('click', (e) => {
        let selectedFormType = e.target.innerText;
        let currentStateSelect = document.querySelector('.icon-form-select');
        currentStateSelect.classList.remove('icon-down')

        document.querySelector('.display-form')
            .innerHTML = selectedFormType;

        if (selectedFormType === "Content game") {
            let currentForm = renderFormType("content");
            document.querySelector('#form-container')
                .innerHTML = currentForm.content;
            document.querySelector('#form-save')
                .innerHTML = currentForm.form_save_type;
        }
        else if (selectedFormType === "Map") {
            let currentForm = renderFormType("map");
            document.querySelector('#form-container')
                .innerHTML = currentForm.map;
            document.querySelector('#form-save')
                .innerHTML = currentForm.form_save_type;
        }
    });

export function showListContent(
    key, iconContainer, icon,
    listContainer, listUnit, data, inputContent,
    avtContent, nameContent, showList
) {
    const idData = getData('id');
    let listData = Object.values(getData('initWuwa'))
        .filter(item => Number(item.odc) === idData);
    const totalData = listData.flatMap(e => e[key]).length;

    document.querySelector(iconContainer).innerHTML = `<i class="bi ${icon} bi-eye-fill"></i>`;

    document.querySelector(listContainer).innerHTML = `
            <div class="p-3">
                <div class="title row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <p class="text-white">Danh sách ${totalData} ${listUnit}</p>
                    </div>
                </div>
                <div class="body row">
                    ${renderContentEndGame(
        listData.flatMap(e => e[key]), data,
        inputContent, avtContent, nameContent
    )}
                </div>
            </div>
        `;

    document.querySelector(listContainer)
        .classList.add('req-order', showList, 'animate__rubberB');
    let widthContainer = 11 - document.querySelector(listContainer).offsetHeight;

    document.querySelector(showList).style.top = `${widthContainer}px`;
}

export function closeListContent(iconContainer, icon, listContainer) {
    document.querySelector(iconContainer).innerHTML = `<i class="bi ${icon} bi-eye-slash-fill"></i>`;
    document.querySelector(listContainer).innerHTML = "";
    document.querySelector(listContainer)
        .classList.remove('req-order', 'animate__rubberB');
}