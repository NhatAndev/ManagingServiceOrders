import { calculatePriceOrder } from "./index.js";
export function renderHomePage() {
    return `
        <div class="d-flex mt-3 justify-content-between align-items-center">
            <div class="d-flex gap-3 tab-render">
                <h5 id="customer-list" class="d-flex align-items-center m-0 p-2 tab-list cursor tabs-element nav-item rounded-pill"
                    >
                    <iconify-icon icon="f7:person-2-fill" class="fs-4"></iconify-icon>
                    <span class="ms-3 tab-title fw-bold m-0 p-0">
                        Danh sách khách hàng
                    </span>
                </h5>
                <h5 id="list-price-service" class="d-flex tab-ignore align-items-center m-0 p-2 cursor tabs-element rounded-pill"
                    >
                    <iconify-icon icon="fa:list" class="fs-6"></iconify-icon>
                    <span class="ms-3 fw-bold m-0 p-0">
                        Bảng giá dịch vụ
                    </span>
                </h5>
            </div>
            <div class="d-flex gap-3 me-2">
                <h5 class="nav-link d-flex align-items-center btn-append-order m-0 p-2 text-white cursor" data-bs-toggle="modal"
                    data-bs-target="#modalOrderId">
                    <iconify-icon icon="icon-park-solid:shopping-cart-add"></iconify-icon>
                    <span class="ps-2 fw-bold">Thêm đơn mới</span>
                </h5>
                <h5 class="nav-link d-flex align-items-center btn-remove-order m-0 p-2 text-white cursor"
                    data-bs-toggle="modal" data-bs-target="#modalDeleteOrderId">
                    <iconify-icon icon="gravity-ui:trash-bin"></iconify-icon>
                    <span class="btn-delete-order ms-1 fw-bold">Xóa đơn</span>
                </h5>
                <h5 class="nav-link d-flex align-items-center btn-update-version badge-custom m-0 p-2 text-white fw-bold"
                    data-bs-toggle="modal" data-bs-target="#modalUpdateVersion">
                    <iconify-icon icon="ic:twotone-tips-and-updates"></iconify-icon>
                    <span class="m-0 p-0 ms-2">Cập nhật phiên bản</span>
                </h5>
            </div>
        </div>
    `;
}


// ol = order list
export function renderProgressListOrder(ol) {
    const crState = (ol.statePurchase === "Chưa thanh toán") ? true : false;

    let statePurchaseText = (crState) ? `Chưa thanh toán` : `Đã thanh toán`;
    let currentStateBg = (crState) ? "state-purchase-not" : "state-purchase-yes"
    let statePurchaseIcon = (crState) ?
        `<i class="bi bi-exclamation-circle me-1"></i>`
        :
        `<i class="bi bi-check-circle me-1"></i>`

    let html = "";

    html += `
        <div class="col-4 pb-2">
            <div class="card cursor card-order text-start">
                <div class="card-body">
                    <div class="d-flex justify-content-between pb-2">
                        <div class="badge-price-order">
                            ${calculatePriceOrder(ol).toLocaleString(0)}đ
                        </div>
                        <div class="">
                            <div class="state-purchase ${currentStateBg}">
                                ${statePurchaseIcon}
                                ${statePurchaseText}
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6 p-0 d-flex justify-content-center align-items-center">
                            <img src="${ol.avt}" alt="" loading="lazy" class="img-fluid">
                        </div>
                        <div class="col-6 ps-3 pe-0">
                            <div>
                                <div class="pt-3">
                                    <div class="mb-1">
                                        Mã đơn: #${ol.odc}
                                    </div>
                                    <div class="mb-1">
                                        UID: ${ol.uid}
                                    </div>
                                    <div class="mb-1">
                                        Level: ${ol.level}
                                    </div>
                                    <div>
                                        Sever: ${ol.sever}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 d-flex justify-content-center">
                            <button data-id="${ol.odc}"
                                class="fw-bold rounded-pill d-flex align-items-center gap-2 w-100 p-2 btn btn-complete-order text-white">
                                <span class="ms-3 p-0">
                                    <iconify-icon icon="iconmind:order-confirm-outline-bold" class="d-flex" width="24px"></iconify-icon>
                                </span>
                                <span class="m-0 p-0">Hoàn thành</span>
                            </button>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button data-id="${ol.odc}"
                                class="rounded-pill d-flex align-items-center gap-2 p-2 w-100    btn btn-detail-order text-white fw-bold"
                                data-bs-toggle="modal" data-bs-target="#modalDetailId">
                                <span class="ms-3 p-0">
                                    <iconify-icon icon="flowbite:eye-outline" class="d-flex" width="24px"></iconify-icon>
                                </span>
                                <span class="m-0 p-0">Chi tiết đơn</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}


export function renderCompleteListOrder(ol) {
    let html = "";

    html += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-2">
            <div class="card w-100 cursor card-order text-start">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="d-flex justify-content-between pb-2">
                            <div class="badge-price-order">
                                ${calculatePriceOrder(ol).toLocaleString(0)}đ
                            </div>
                            <div class="">
                                <div class="state-purchase state-purchase-yes">
                                    <i class="bi bi-check-circle me-1"></i>
                                    <span>Đã thanh toán</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center align-items-center ">
                            <img src="${ol.avt}" alt="" loading="lazy" class="img-fluid">
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div>
                                <div class="pt-3">
                                    <p class="mb-1">
                                        Mã đơn: #${ol.odc}
                                    </p>
                                    <p class="mb-1">
                                        UID: ${ol.uid}
                                    </p>
                                    <p class="mb-1">
                                        Level: ${ol.level}
                                    </p>
                                    <p>
                                        Server: ${ol.sever}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button data-id="${ol.odc}"
                            class="rounded-pill w-50 gap-2 p2 d-flex align-items-center justify-content-center btn btn-detail-order text-white fw-bold"
                            data-bs-toggle="modal" data-bs-target="#modalDetailId">
                            <span class="ms-3 p-0">
                                <iconify-icon icon="flowbite:eye-outline" class="d-flex" width="24px"></iconify-icon>
                            </span>
                            <span>Chi tiết đơn</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}


export function renderDetailOrder(dO, id) {
    return `
        <div class="container-fluid">
            <div class="mb-4">
                <h6 class="text-white text-uppercase fw-bold">Thông tin cơ bản</h6>
                <div class="information">
                    <div class="d-flex mb-2 justify-content-between">
                        <p class="m-0">
                            Mã đơn:
                        </p>
                        <span>#${id}</span>
                    </div>
                    <div class="d-flex mb-2 justify-content-between">
                        <p class="m-0">
                            UID:
                        </p>
                        <span>${dO.uid}</span>
                    </div>
                    <div class="d-flex mb-2 justify-content-between">
                        <p class="m-0">
                            Tài khoản:
                        </p>
                        <div class="d-flex">
                            <span class="copy-text">${dO.account.accountName}</span>
                            <button class="btn btn-copy text-white ms-2"><i class="bi bi-clipboard"></i></button>
                        </div>
                    </div>
                    <div class="d-flex mb-2 justify-content-between">
                        <p class="m-0">
                            Mật khẩu:
                        </p>
                        <div class="d-flex">
                            <span class="copy-text">${dO.account.password}</span>
                            <button class="btn btn-copy text-white ms-2"><i class="bi bi-clipboard"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <h6 class="text-white text-uppercase fw-bold">Thông tin cần cày</h6>
            <div class="information mb-4">
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Chạy map:
                    </p>
                    <span>
                        ${dO.area}
                    </span>
                </div>
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Số lượng map:
                    </p>
                    <span>
                        ${dO.mapCount}
                    </span>
                </div>
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Quest:
                    </p>
                    <span>
                        ${dO.quest}
                    </span>
                </div>
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Event:
                    </p>
                    <span>
                        ${dO.event}
                    </span>
                </div>
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Matrix:
                    </p>
                    <div class="d-flex">
                        <span id="list-boss-detail" class="ps-1">
                            ${dO.matrix.type}
                        </span>
                    </div>
                </div>
                <div class="d-flex mb-2 justify-content-between">
                    <p class="m-0 p-0">
                        Hologram:
                    </p>
                    <div class="d-flex">
                        <span id="list-boss-detail" class="ps-1 position-relative">
                            ${(Number(dO.listBoss) === 0) ?
            `
                                    <span>Chưa có boss nào</span>
                                `
            :
            `
                                <div>
                                    <span>${dO.listBoss.length} boss</span>
                                    <button id="display-list-boss" class="btn ms-1 text-white p-0">
                                        <i class="bi bi-holo-close bi-eye-slash-fill"></i>
                                    </button>
                                </div>
                                <div id="display-boss" class="text-white show-list-boss m-0 p-0"></div>
                                `
        }
                        </span>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="m-0 p-0">
                        End game:
                    </p>
                    <div class="d-flex">
                        <span id="list-endgame-content" class="ps-1 position-relative">
                            ${(Number(dO.endGame) === 0) ?
            `
                                    <span>Chưa có boss nào</span>
                                `
            :
            `
                                <div>
                                    <span>${dO.endGame.length} content</span>
                                    <button id="display-list-endgame" class="btn ms-1 text-white p-0">
                                        <i class="bi bi-endgame-close bi-eye-slash-fill"></i>
                                    </button>
                                </div>
                                <div id="display-endgame" class="text-white show-list-endgame m-0 p-0"></div>
                                `
        }
                        </span>
                    </div>
                </div>
            </div>

            <h6 class="text-white text-uppercase fw-bold">Thời gian xử lý đơn</h6>
            <div id="order-date" class="information mb-4">
                <div class="d-flex justify-content-between mb-2">
                    <p class="m-0">
                        Ngày tạo đơn:
                    </p>
                    <div class="d-flex">
                        <span>${dO.timeCreate.hour} : ${dO.timeCreate.min} : ${dO.timeCreate.sec} |</span>
                        <span class="ps-2">${dO.dateCreate.day} / ${dO.dateCreate.month} / ${dO.dateCreate.year}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    ${(dO.dateComplete.day, dO.dateComplete.month, dO.dateComplete.year) ?
            `  
                            <p class="m-0">
                                Ngày hoàn thành đơn:
                            </p>
                            <div class="d-flex">
                                <span>${dO.timeComplete.hour} : ${dO.timeComplete.min} : ${dO.timeComplete.sec} |</span>
                                <span class="ps-2">${dO.dateComplete.day} / ${dO.dateComplete.month} / ${dO.dateComplete.year}</span>
                            </div>
                        `:
            `
                            <p class="m-0">
                                Ngày hoàn thành đơn:
                            </p>
                            <span>Chưa có dữ liệu</span>
                        `
        }
                </div>
            </div>
        </div>
    `;
}

export function renderOverviewOrder(glo, crco) {

    // glo = getListOrder
    // crco = calculateRatioCompleteOrder

    document.querySelector('#total-task').innerHTML = `${glo('totalOrder') ? glo('totalOrder') : "0"}`;
    document.querySelector('#progress-task').innerHTML = `${glo('progressListOrder') ? glo('progressListOrder').length : "0"}`;
    document.querySelector('#complete-task').innerHTML = `${glo('completeOrder') ? glo('completeOrder').length : "0"}`;
    crco();
}

export function renderOverView() {
    return {
        order: `
            <div class="row">
                <div class="col-3">
                    <div class="card card-overview text-start" style="background: var(--total-task);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 d-flex justify-content-center align-items-center p-0">
                                    <iconify-icon icon="iconmind:arrange-act-assert-outline-bold" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0">
                                    <h5 class="fw-bold">Tổng đơn</h5>
                                    <h2 id="total-task"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card card-overview text-start" style="background: var(--progress-task);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0">
                                    <iconify-icon icon="eos-icons:loading" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0">
                                    <h5 class="fw-bold">Đang cày</h5>
                                    <h2 id="progress-task"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card card-overview text-start" style="background: var(--complete-task);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0">
                                    <iconify-icon icon="material-symbols-light:order-approve" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0">
                                    <h5 class="fw-bold">Hoàn thành</h5>
                                    <h2 id="complete-task"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card card-overview text-start" style="background: var(--complete-rate);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0">
                                    <iconify-icon icon="fa6-solid:bars-progress" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0">
                                    <h5 class="fw-bold p-0">Tiến độ</h5>
                                    <h2 id="complete-rate"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        home: `
            <div class="row">
                <div class="col">
                    <div class="card card-overview text-start" style="background: var(--total-customer);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0 d-flex justify-content-center align-items-center border-right-custom">
                                    <iconify-icon icon="fluent:people-queue-48-filled" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0 ps-4">
                                    <h5 class="fw-bold">Tổng khách hàng</h5>
                                    <h2 id="total-customer"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card-overview text-start" style="background: var(--max-price);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0 border-right-custom d-flex justify-content-center align-items-center">
                                    <iconify-icon icon="streamline-freehand:money-bill-fly" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0 ps-4">
                                    <h5 class="fw-bold">Đơn lớn nhất</h5>
                                    <h2 id="max-price"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card-overview text-start" style="background: var(--total-money);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 p-0 d-flex justify-content-center align-items-center border-right-custom">
                                    <iconify-icon icon="hugeicons:money-receive-square" width="100" height="70" style="color: white;"></iconify-icon>
                                </div>
                                <div class="col-8 text-white p-0 ps-4">
                                    <h5 class="fw-bold">Tổng tiền</h5>
                                    <h2 id="total-money"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };
}

export function renderListCustomer(cl) {
    let tierBackground = "";
    let tierIcon = "";
    let tierCustomer = "";

    if (cl.tier === "Khách Mới") {
        tierBackground = "tier-new";
        tierIcon = `<iconify-icon icon="mdi:sparkles"></iconify-icon>`;
        tierCustomer = cl.tier;
    }
    else if (cl.tier === "Khách Thường") {
        tierBackground = "tier-normal";
        tierIcon = `<iconify-icon icon="solar:user-check-line-duotone"></iconify-icon>`;
        tierCustomer = cl.tier;
    }
    else {
        tierBackground = "tier-vip";
        tierIcon = `<iconify-icon icon="material-symbols:crown"></iconify-icon>`;
        tierCustomer = cl.tier;
    }


    return `
        <div class="col-4 pb-2 text-white">
            <div class="card cursor card-order text-start">
                <div class="card-body">
                    <div class="d-flex justify-content-end">
                        <div class="tier-customer d-flex align-items-center ${tierBackground}">
                            <h6 class="d-flex m-0 p-0">
                                ${tierIcon}
                            </h6>
                            <span class="ms-2">${tierCustomer}</span>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6 d-flex justify-content-center align-items-center p-0" >
                            <img src="${cl.avt}" class="img-fluid--customer" loading="lazy">
                        </div>
                        <div class="col ps-3 pe-0">
                            <div class="pt-3">
                                <div class="mb-1">
                                    Name: <span>${cl.name}</span>
                                </div>
                                <div class="d-flex mb-1 align-items-center">
                                    <p class="m-0 p-0">
                                        UID: <span class="copy-text">${cl.uid}</span>
                                    </p>
                                    <button class="btn btn-copy ms-2 text-white">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-1">
                                    Level: <span>${cl.level}</span>
                                </div>
                                <div class="mb-1">
                                    Server: <span>${cl.sever}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <button data-id="${cl.customerId}"
                            class="rounded-pill d-flex align-items-center gap-2 p-2 w-50 btn btn-detail-customer text-white fw-bold"
                            data-bs-toggle="modal" data-bs-target="#modalCustomerId">
                            <span class="ms-3 p-0">
                                <iconify-icon icon="flowbite:eye-outline" class="d-flex" width="24px"></iconify-icon>
                            </span>
                            <span class="m-0 p-0">Chi tiết khách</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderContentEndGame(params, initData, input, avt, name) {
    let html = "";

    params.forEach(e => {
        const foundContent = initData().find(item => item[input] === e.trim());

        html += `
                <div class="col-4 pt-3 ">
                    <div class="bg-list-boss fw-bold rounded-pill">
                        <div class="d-flex p-1">
                            <div class="ms-1 d-flex align-items-center">
                                <img class=" img-boss" src=${foundContent[avt]}></img>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="ms-2"> 
                                    ${foundContent[name]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `
    });
    return html;
}

export function renderDetailCustomer(dc, da) {
    return `
        <div class="container-fluid">
            <h3 class="text-uppercase fw-bold">thông tin đơn hàng: </h3>
            <div class="req-order mb-4">
                <div class="d-flex justify-content-between">
                    <h5>Tổng đơn:</h5>
                    <span>${dc.totalOrder} đơn</span>
                </div>
                <div class="d-flex justify-content-between">
                    <h5>Tổng số tiền:</h5>
                    <span>${Number(dc.totalMoney).toLocaleString(0)}đ</span>
                </div>
            </div>
            <h3 class="text-uppercase fw-bold">thông tin tài khoản</h1>
            <div class="req-order">
                <div class="d-flex justify-content-between">
                    <h5>Tài khoản:</h5>
                    <div class="d-flex align-items-center">
                        <span class="copy-text m-0">${da.accountName}</span>
                        <button class="btn btn-copy text-white ms-2">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <h5>Mật khẩu:</h5>
                    <div class="d-flex align-items-center">
                        <span class="copy-text m-0">${da.password}</span>
                        <button class="btn btn-copy text-white ms-2">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderServicePrice() {
    return `
        <div class="wrapper-service-price ms-3 dropdown-fade text-white">
            <div class="wrapper-content">
                <div class="service-price-title text-center gap-5 d-flex justify-content-center align-items-center p-3 text-uppercase">
                    <span>Bảng giá cày thuê</span>
                    <span id="add-content-quest" class="cursor p-2 bg-content d-flex gap-2 rounded-pill"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAddContentQuest">
                        <iconify-icon icon="lucide:database-zap" class="d-flex"></iconify-icon>
                        <span>Thêm dữ liệu</span>
                    </span>
                </div>
                <div class="service-price-content row">
                    <div class="quest-event text-center pe-0 col-5">
                        <div id="game-content" class="quest-event-title gap-3">
                            <span class="m-0 p-2 cursor content bg-content normal-content d-flex gap-2">
                                <iconify-icon icon="lucide:clipboard-list" class="d-flex"></iconify-icon>
                                <span>Content thường</span>
                            </span>
                            <span class="m-0 p-2 cursor content end-game-content d-flex gap-2">
                                <iconify-icon icon="lucide:swords" class="d-flex"></iconify-icon>
                                <span>Content end game</span>
                            </span>
                        </div>
                        <div class="quest-event-content">
                            <div id="content-container" class="mb-2"></div>
                            <div id="content-pagination" class="d-flex justify-content-center"></div>
                        </div>
                    </div>
                    <div class="map-service ps-0 m-0 col-7">
                        <div class="map-title gap-5 text-center">
                            <span class="m-0">Các khu vực chạy map hiện đang có</span>
                            <span id="edit-map" class="cursor p-2 bg-content d-flex gap-2 rounded-pill"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditMap">
                                <iconify-icon icon="gis:map-options" class="d-flex"></iconify-icon>
                                <span>Chỉnh sửa số lượng map</span>
                            </span>
                        </div>
                        <div class="row">
                            <span class="col m-0 p-3 align-items-center d-flex justify-content-center">
                                <span class="badge-custom m-0 rounded-pill">
                                    Tên khu vực
                                </span>
                            </span>
                            <span class="col m-0 p-3 align-items-center d-flex justify-content-center">
                                <span class="badge-custom m-0 rounded-pill">
                                    Số lượng map
                                </span>
                            </span>
                            <span class="col m-0 p-3 align-items-center d-flex justify-content-center">
                                <span class="badge-custom m-0 rounded-pill">
                                    Giá mỗi map
                                </span>
                            </span>
                        </div>
                        <div class="map-content"></div>
                        <div class="map-pagination pb-2 d-flex justify-content-center text-white"></div>
                    </div>
                </div>
            </div>
        </div>
        `
        ;
}

export function renderListMap(da) {
    return `
        <div class="row map-items p-1">
            <span class="col-4 ps-5">${da.area}</span>
            <span class="col-4 d-flex justify-content-center">${da.totalMap}</span>
            <span class="col-4 d-flex justify-content-center">${da.price.toLocaleString(0)}đ / 1 map</span>
        </div>
    `;
}


export function renderFilterByCondition() {
    return {
        progress:
            `
            <div id="filter" class="btn-group">
                <button class="btn ms-3 btn-filter fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-funnel"></i>
                    Lọc theo
                </button>
                <div class="dropdown-menu p-0 dropdown-menu-start" aria-labelledby="triggerId">
                    <div class="dropdown-fade dropdown-filter--bg">
                        <div id="filter-sp-y" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn đã thanh toán</p>
                        </div>
                        <div id="filter-sp-n" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn chưa thanh toán</p>
                        </div>
                        <div id="filter-event-quest" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn event hoặc quest</p>
                        </div>
                        <div id="filter-matrix" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn đánh matrix</p>
                        </div>
                        <div id="filter-holo" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn đánh boss holo</p>
                        </div>
                        <div id="filter-map" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn chạy mỗi map</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="sort" class="btn-group">
                <button class="btn ms-3 btn-sort fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-arrow-down-up"></i>
                    Sắp xếp theo giá
                </button>
                <div class="dropdown-menu dropdown-sort--bg p-0 dropdown-menu-start" aria-labelledby="triggerId">
                    <div class="dropdown-fade dropdown-sort--bg">
                        <div id="filter-sp-y">
                            <div id="filter-price-asc" class="dropdown-filter">
                                <p class="m-0 ps-3 p-1">Giá tăng dần</p>
                            </div>
                            <div id="filter-price-des" class="dropdown-filter">
                                <p class="m-0 ps-3 p-1">Giá giảm dần</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        complete:
            `
            <div id="filter" class="btn-group">
                <button class="btn ms-3 btn-filter fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-funnel"></i>
                    Lọc theo
                </button>
                <div class="dropdown-menu dropdown-filter--bg p-0 dropdown-menu-start" aria-labelledby="triggerId">
                    <div class="dropdown-fade dropdown-filter--bg">
                        <div id="filter-event-quest" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn event hoặc quest</p>
                        </div>
                        <div id="filter-matrix" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn đánh matrix</p>
                        </div>
                        <div id="filter-holo" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn đánh boss holo</p>
                        </div>
                        <div id="filter-map" class="dropdown-filter">
                            <p class="m-0 ps-3 p-1">Đơn chạy mỗi map</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="sort" class="btn-group">
                <button class="btn ms-3 btn-sort fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-arrow-down-up"></i>
                    Sắp xếp theo giá
                </button>
                <div class="dropdown-menu dropdown-sort--bg p-0 dropdown-menu-start" aria-labelledby="triggerId">
                    <div class="dropdown-fade dropdown-sort--bg">
                        <div id="filter-sp-y">
                            <div id="filter-price-asc" class="dropdown-filter">
                                <p class="m-0 ps-3 p-1">Giá tăng dần</p>
                            </div>
                            <div id="filter-price-des" class="dropdown-filter">
                                <p class="m-0 ps-3 p-1">Giá giảm dần</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };
}

export function renderContent(dContent) {
    return `
        <div class="d-flex flex-content-item align-items-center ms-5 me-5 pt-3 justify-content-between">
            <span class="badge-custom fw-bold row rounded-pill" style="width:180px;">
                <div class="col-2">
                    <img style="width:24px;" src="${dContent.iconContent}" />
                </div>
                <div class="col-10">
                    ${dContent.nameContent}
                </div>
            </span>
            <span>
                ${(dContent.priceContent === "free") ?
            `<span>
                        free / 1 ${dContent.unitContent}
                    </span>`
            :
            `<span>
                        ${Number(dContent.priceContent).toLocaleString(0)}đ / 1 ${dContent.unitContent}
                    </span>`
        }
            </span>
        </div>
    `;
}

export function renderFormType(id) {
    return {
        content: `
            <div class="row pb-3">
                <div class="col">
                    <label for="" class="form-label">Nhập tên content</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="dinkie-icons:label-filled"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-content" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errContent" class="text-danger p-0 m-0"></p>
                </div>
                <div class="col">
                    <label for="input-img" class="form-label cursor">Chọn icon content</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="boxicons:images"></iconify-icon>
                        </h4>
                        <input type="text" name="" class="fake-input form-control custom-disabled"
                        placeholder="" aria-describedby="helpId" />
                        <input type="file" hidden name="" id="input-img" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errIconContent" class="text-danger p-0 m-0"></p>
                </div>
            </div>
            <div class="row pb-3">
                <div class="col-6">
                    <label for="" class="form-label">Nhập giá</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="akar-icons:money"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-content-price" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errContentPrice" class="text-danger p-0 m-0"></p>
                </div>
                <div class="col-6">
                    <label for="" class="form-label">Nhập đơn vị</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="iconmind:unit-economics-duotone-thin"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-content-unit" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errContentUnit" class="text-danger p-0 m-0"></p>
                </div>
            </div>
        `,
        map: `
            <div class="row pb-3">
                <div class="col">
                    <label for="" class="form-label">Nhập tên khu vực</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="dinkie-icons:label-filled"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-map" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errInputMap" class="m-0 p-0 text-danger"></p>
                </div>
            </div>
            <div class="row pb-3">
                <div class="col-6">
                    <label for="" class="form-label">Nhập số lượng map</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="akar-icons:money"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-total-map" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errTotalMap" class="m-0 p-0 text-danger"></p>
                </div>
                <div class="col-6">
                    <label for="" class="form-label">Nhập giá mỗi map</label>
                    <div class="input-wrapper">
                        <h4 class="icon-form">
                            <iconify-icon icon="iconmind:unit-economics-duotone-thin"></iconify-icon>
                        </h4>
                        <input type="text" name="" id="input-map-price" class="form-control"
                        placeholder="" aria-describedby="helpId" />
                    </div>
                    <p id="errMapPrice" class="m-0 p-0 text-danger"></p>
                </div>
            </div>
        `,
        form_save_type: `
            <button type="button"
                class="fw-bold btn ms-3 btn-save-form--${id} rounded-pill text-uppercase
                d-flex justify-content-center align-items-center">
                <span class="m-0 p-0">Lưu dữ liệu</span>
                <h5 class="m-0 ps-3 d-flex">
                    <iconify-icon icon="ic:sharp-tips-and-updates"></iconify-icon>
                </h5>
            </button>
        `
    }
}