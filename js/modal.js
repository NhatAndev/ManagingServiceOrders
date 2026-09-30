import { getData } from "./storage.js";

const currentVersion = getData('currentVersion');
document.querySelector('#modal-create-order')
    .innerHTML = `
    <div class="modal fade" id="modalOrderId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11">
                                <h5 class="modal-title text-center fw-bold" id="modalTitleId">
                                    FORM ĐIỀN THÔNG TIN ĐƠN CÀY
                                </h5>
                            </div>
                            <div class="col">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <form id="form-create-order" action="">
                            <h4 class="fw-bold text-uppercase active-text-order">Thông tin cơ bản của account</h4>
                            <div class="req-order mb-2">
                                <div class="row">
                                    <div class="col">
                                        Nhập vào UID
                                        <div class="mb-3">
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="solar:user-bold"></iconify-icon>
                                                </h4>
                                                <input type="text" name="" id="inputUID" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errUID" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        Nhập vào Level
                                        <div class="mb-3">
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="material-symbols:badge-rounded"></iconify-icon>
                                                </h4>
                                                <input type="text" name="" id="inputLevel" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errLevel" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        Server
                                        <div class="mb-3">
                                            <div id="slt-sever" class="btn-group input-wrapper w-100">
                                                <div class="select-sever form-control fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                        <h4 class="icon-form">
                                                            <iconify-icon icon="mdi:web"></iconify-icon>
                                                        </h4>
                                                        <span class="display-sever">Chọn server</span>
                                                </div>
                                                <div class="dropdown-menu bg-sever w-100 p-0 dropdown-menu-start" aria-labelledby="triggerId">
                                                    <div class="dropdown-fade sever-list cursor">
                                                        <div id="asia-sv" class="sever-ele">
                                                            <p class="m-0 ps-3 p-1">Asia</p>
                                                        </div>
                                                        <div id="sea-sv" class="sever-ele">
                                                            <p class="m-0 ps-3 p-1">Sea</p>
                                                        </div>
                                                        <div id="amc-sv" class="sever-ele">
                                                            <p class="m-0 ps-3 p-1">American</p>
                                                        </div>
                                                        <div id="eu-sv" class="sever-ele">
                                                            <p class="m-0 ps-3 p-1">Europe</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p id="errSever" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input d-flex" type="radio" name="payMoney" id="paid"
                                                    value="Đã thanh toán" />
                                                <label class="form-check-label" for="paid">Đã thanh toán</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="payMoney" id="un-paid"
                                                    value="Chưa thanh toán" />
                                                <label class="form-check-label" for="un-paid">Chưa thanh toán</label>
                                            </div>
                                            <p id="errPayMoney" class="col text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div>
                                            <span class="m-0 p-0 fw-bold text-version">Phiên bản hiện tại: </span>
                                            <span id="cr-version" class="text-version m-0 p-0 fw-bold">
                                                ${(
                                                    currentVersion === "" ||
                                                    currentVersion === null
                                                ) ? "Chưa cập nhật" : currentVersion
                                                }
                                            </span>
                                        </div>
                                        <small id="errVersion" class="text-danger fw-bold"></small>
                                    </div>
                                </div>
                            </div>

                            <h4 class="fw-bold text-uppercase active-text-order">Thông tin dịch vụ cày</h4>

                            <div class="req-order mb-3">
                                <div class="row align-items-center pb-2">
                                    <div class="col-1">
                                        <span class="bi bi-map-fill fs-5 fw-bolder text-order-req"></span>
                                    </div>
                                    <div class="col-11">
                                        <h5 class="fw-bold text-order-req m-0">CHẠY MAP</h5>
                                    </div>
                                </div>

                                <div class="row pb-1">
                                    <div class="col-6">
                                        Nhập vào khu vực
                                        <div>  
                                            <div class="input-wrapper">
                                                <h4 class="bi bi-geo-alt icon-form"></h4>
                                                <input type="text" name="" id="inputArea" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errArea" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        Số lượng
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="game-icons:stack"></iconify-icon>
                                                </h4>
                                                <input type="tel" name="" id="inputMapCount" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errMapCount" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="req-order mb-3">
                                <div class="row align-items-center pb-2">
                                    <div class="col-1">
                                        <span class="bi bi-calendar2-plus-fill fs-5 fw-bolder text-order-req"></span>
                                    </div>
                                    <div class="col-11">
                                        <h5 class="fw-bold text-order-req m-0 p-0 text-uppercase">Content thường</h5>
                                    </div>
                                </div>

                                <div class="row pb-1">
                                    <div class="col">
                                        <span>Nhập vào số lượng event</span>
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="material-symbols:event-outline"></iconify-icon>
                                                </h4>
                                                <input type="tel" name="" id="inputEvent" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errEvent" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <span>Nhập vào số lượng quest</span>
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="material-symbols:task"></iconify-icon>
                                                </h4>
                                                <input type="tel" name="" id="inputQuest" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errQuest" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <span>Nhập vào boss hologram:</span>
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="game-icons:skull-crossed-bones"></iconify-icon>
                                                </h4>
                                                <input type="tel" name="" id="inputHolo" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errHolo" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="req-order mb-3">
                                <div class="row align-items-center pb-2">
                                    <div class="col-1">
                                        <span class="bi bi-patch-question-fill fs-5 fw-bolder text-order-req"></span>
                                    </div>
                                    <div class="col-11">
                                        <h5 class="fw-bold text-order-req m-0 p-0 text-uppercase">Content end game</h5>
                                    </div>
                                </div>

                                <div class="row pb-1">
                                    <div class="col">
                                        Nhập mốc MATRIX
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="game-icons:crossed-swords"></iconify-icon>
                                                </h4>
                                                <input type="text" name="" id="inputMatrix" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errMatrix" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        Nhập các end game
                                        <div>
                                            <div class="input-wrapper">
                                                <h4 class="icon-form">
                                                    <iconify-icon icon="game-icons:bloody-sword"></iconify-icon>
                                                </h4>
                                                <input type="text" name="" id="input-end-game" class="form-control"
                                                placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <p id="errEndGame" class="text-danger p-0 m-0"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="d-flex justify-content-center gap-5">
                        <button id="btn-cancel-order" type="button"
                            class="fw-bold w-50 btn btn-cancel-order rounded-pill text-uppercase
                            d-flex justify-content-center align-items-center">
                            <span class="m-0 p-0">Tạm thời không tạo đơn</span>
                            <span class="ms-3 button-icon-cancel d-flex justify-content-center align-items-center">
                                <iconify-icon icon="fa:close"></iconify-icon>
                            </span>
                        </button>
                        <button id="btn-save-order" type="button"
                            class="fw-bold w-50 btn btn-save-order rounded-pill text-uppercase
                            d-flex justify-content-center align-items-center">
                            <span class="m-0 p-0">Tạo đơn mới</span>
                            <span class="m-0 ps-3 d-flex button-icon-save">
                                <iconify-icon icon="mingcute:telegram-fill"></iconify-icon>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

document.querySelector('#modal-detail-order')
    .innerHTML = `
    <div class="modal fade" id="modalDetailId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11">
                                <h5 class="modal-title fw-bold text-center" id="modalDetailId">
                                    CHI TIẾT ĐƠN CÀY
                                </h5>
                            </div>
                            <div class="col-1">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="detail-order" class="modal-body"></div>
            </div>
        </div>
    </div>
`;

document.querySelector('#modal-detail-customer')
    .innerHTML = `
    <div class="modal fade" id="modalCustomerId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11 ">
                                <h5 class="modal-title fw-bold text-center text-uppercase" id="modalUserInformation">
                                    Thông tin khách hàng
                                </h5>
                            </div>
                            <div class="col-1">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="customer-detail" class="modal-body"></div>
            </div>
        </div>
    </div>
`;

document.querySelector('#modal-delete-order')
    .innerHTML = `
    <div class="modal fade" id="modalDeleteOrderId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11 ">
                                <h5 class="modal-title fw-bold text-center text-uppercase" id="modalUserInformation">
                                    Thông tin đơn cần xóa
                                </h5>
                            </div>
                            <div class="col-1">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <form id="form-delete-order" class="d-flex">
                            <div class="col">
                                <div class="mb-1">
                                    <label for="" class="form-label">Nhập id đơn cần xóa: </label>
                                    <div class="input-wrapper">
                                        <h4 class="icon-form">
                                            <iconify-icon icon="gravity-ui:trash-bin"></iconify-icon>
                                        </h4>
                                        <input type="text" name="" id="inputDeleteId" class="form-control" placeholder=""
                                        aria-describedby="helpId" />
                                    </div>
                                    <small id="errDelete" class="text-danger fw-bold"></small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-3">
                    <button id="btn-not-delete-order" type="button"
                        class="fw-bold btn btn-cancel-order rounded-pill text-uppercase
                        d-flex justify-content-center align-items-center">
                        <span class="m-0 p-0">Tạm thời không xóa</span>
                        <span class="ms-3 button-icon-cancel d-flex justify-content-center align-items-center">
                            <iconify-icon icon="fa:close"></iconify-icon>
                        </span>
                    </button>
                    <button id="btn-delete-order" type="button"
                        class="fw-bold btn ms-3 btn-save-order rounded-pill text-uppercase
                        d-flex justify-content-center align-items-center">
                        <span class="m-0 p-0">Xác nhận xóa đơn</span>
                        <span class="m-0 ps-3 d-flex button-icon-delete">
                            <iconify-icon icon="subway:delete"></iconify-icon>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
`

document.querySelector('#modal-update-version')
    .innerHTML = `
    <div class="modal fade" id="modalUpdateVersion" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11 ">
                                <h5 class="modal-title fw-bold text-center text-uppercase" id="modalUpdateVersion">
                                    Cập nhật phiên bản hiện tại
                                </h5>
                            </div>
                            <div class="col-1">
                                <div id="update-version" type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <form id="formVersion" class="d-flex">
                            <div class="col">
                                <div>
                                    <label for="" class="form-label">Nhập phiên bản hiện tại</label>
                                    <div class="input-wrapper">
                                        <h4 class="icon-form">
                                            <iconify-icon icon="ic:twotone-tips-and-updates"></iconify-icon>
                                        </h4>
                                        <input type="text" name="" id="inputCurrentVersion" class="form-control"
                                        placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <small id="errCurrentVersion" class="text-danger fw-bold"></small>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="d-flex justify-content-center mb-3">
                    <button id="btn-update-version" type="button"
                        class="fw-bold btn ms-3 btn-save-order rounded-pill text-uppercase
                        d-flex justify-content-center align-items-center">
                        <span class="m-0 p-0">Cập nhật</span>
                        <h5 class="m-0 ps-3 d-flex button-icon-update-version">
                            <iconify-icon icon="ic:sharp-tips-and-updates"></iconify-icon>
                        </h5>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

document.querySelector('#modal-update-state-purchase')
    .innerHTML = `
    <div
        class="modal fade"
        id="modalUpdateStatePurchase"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
        >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11 ">
                                <h5 class="modal-title fw-bold text-center text-uppercase" id="modalUpdateVersion">
                                    Cập nhật trạng thái thanh toán
                                </h5>
                            </div>
                            <div class="col-1">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <label for="" class="form-label">Nhập id cần sửa</label>
                            <div class="input-wrapper">
                                <h4 class="icon-form">
                                    <iconify-icon icon="ic:twotone-tips-and-updates"></iconify-icon>
                                </h4>
                            <input type="text" name="" id="inputStatePurchase" class="form-control"
                            placeholder="" aria-describedby="helpId" />
                        </div>
                        <small id="errStatePurchase" class="text-danger fw-bold"></small>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-3">
                    <button id="btn-state-purchase" type="button"
                        class="fw-bold btn ms-3 btn-save-order rounded-pill text-uppercase
                        d-flex justify-content-center align-items-center">
                        <span class="m-0 p-0">Cập nhật</span>
                        <h5 class="m-0 ps-3 d-flex button-icon-update-state">
                            <iconify-icon icon="ic:sharp-tips-and-updates"></iconify-icon>
                        </h5>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

document.querySelector('#modal-add-content-quest')
    .innerHTML = `
    <div
        class="modal fade"
        id="modalAddContentQuest"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
        >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-11 ">
                                <h5 class="modal-title fw-bold text-center text-uppercase" id="modalUpdateVersion">
                                    Thêm dữ liệu    
                                </h5>
                            </div>
                            <div class="col-1">
                                <div type="button" class="fs-4 btn-close-modal d-flex align-items-center justify-content-center" data-bs-dismiss="modal">
                                    <iconify-icon icon="fa:close"></iconify-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="pb-4">
                            <div><label for="" class="form-label">Chọn form thêm dữ liệu</label></div>
                            <div id="slt-form" class="btn-group input-wrapper w-50">
                                <div class="select-form form-control fw-bold text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <h4 class="icon-form">
                                        <iconify-icon icon="fluent:form-multiple-24-filled"></iconify-icon>
                                    </h4>
                                    <span class="display-form">Content game</span>
                                    <span class="ms-4">
                                        <iconify-icon icon="bi:chevron-down" class="icon-form-select"></iconify-icon>
                                    </span>
                                </div>
                                <div class="dropdown-menu form-list bg-sever w-100 p-0 dropdown-menu-start" aria-labelledby="triggerId">
                                    <div class="dropdown-fade cursor">
                                        <div id="form-content-game" class="sever-ele">
                                            <p class="m-0 ps-3 p-1">Content game</p>
                                        </div>
                                        <div id="form-map" class="sever-ele">
                                            <p class="m-0 ps-3 p-1">Map</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form id="form-container">
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
                        </form>
                    </div>
                </div>
                
                <div id="form-save" class="d-flex justify-content-center mb-3">
                    <button type="button"
                        class="fw-bold btn ms-3 btn-save-form--content rounded-pill text-uppercase
                        d-flex justify-content-center align-items-center">
                        <span class="m-0 p-0">Lưu dữ liệu</span>
                        <h5 class="m-0 ps-3 d-flex">
                            <iconify-icon icon="fluent:document-save-24-filled"></iconify-icon>
                        </h5>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;


document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hide.bs.modal', () => {
        document.activeElement?.blur();
    });
});