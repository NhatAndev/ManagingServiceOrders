import { closeListContent, copyIntoClipBoard, hideModal, showListContent, showNotice } from "./index.js";
import { initBossHolo, initContentEndGame } from "./init.js";
import { pagination } from "./pagination.js";
import { renderCompleteListOrder, renderContent, renderFormType, renderContentEndGame, renderProgressListOrder } from "./render.js";
import { getData, saveData } from "./storage.js";
import { validEmptyValue } from "./valid.js";

let iconContent = "";
document.addEventListener('change', e => {
    if (e.target.closest('#input-img')) {
        const img = document.querySelector("#input-img");
        iconContent = img.files[0].name;
        document.querySelector('.fake-input').value = iconContent.replace(/\.[^/.]+$/, '');
    }
})

document.addEventListener('focusin', e => {
    if (!e.target.classList.contains('form-control')) return;

    const parent = e.target.closest('.input-wrapper');

    parent.querySelector('.icon-form')
        .classList.add('glow-icon');
});

document.addEventListener('focusout', e => {
    if (!e.target.classList.contains('form-control')) return;

    const parent = e.target.closest('.input-wrapper');

    parent.querySelector('.icon-form')
        .classList.remove('glow-icon');
});

document.addEventListener('click', e => {
    if (e.target.closest('.btn-copy')) {
        const parent = e.target.closest('.d-flex');
        const btn = e.target.closest('.btn-copy');
        copyIntoClipBoard(parent, '.copy-text', btn);
    }

    if (e.target.closest('#progress-button')) {
        document.querySelector('#list-order').classList.remove('is-filter');
        const progressList = getData('progressListOrder');
        saveData('currentList', []);

        if (progressList.length === 0) {
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
            pagination(getData, 'progressListOrder', renderProgressListOrder, '#list-order',
                '#pagination', { btnPrev: 'btn-prev-progress', btnNext: 'btn-next-progress' });
        }
    }



    if (e.target.closest('#complete-button')) {
        const completeList = getData('completeOrder');
        saveData('currentList', []);

        if (completeList.length === 0) {
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
            saveData('completeOrder', completeList.sort((a, b) => a.odc - b.odc))
            pagination(getData, 'completeOrder', renderCompleteListOrder, '#list-order', '#pagination',
                { btnPrev: 'btn-prev-complete', btnNext: 'btn-next-complete' });
        }
    }

    if (e.target.closest('.btn-detail-order')) {
        let id = Number(e.target.closest('.btn-detail-order').dataset.id);
        saveData('id', id);
    }

    if (e.target.closest('#display-list-boss')) {
        if (e.target.closest('.bi-holo-close')) {
            showListContent(
                "listBoss", "#display-list-boss", "bi-holo-open",
                '#display-boss', "boss holo", initBossHolo,
                "bossInput", "avt", "bossName", '.show-list-boss'
            );
        }
        if (e.target.closest('.bi-holo-open')) {
            closeListContent('#display-list-boss', "bi-holo-close",'#display-boss');
        }
    }
    if (e.target.closest('#list-endgame-content')) {
        if (e.target.closest('.bi-endgame-close')) {
            showListContent(
                "endGame", "#display-list-endgame", "bi-endgame-open",
                '#display-endgame', "content", initContentEndGame,
                "nameContent", "iconContent", "nameContent", '.show-list-endgame'
            );
        }
        if (e.target.closest('.bi-endgame-open')) {
            closeListContent('#display-list-endgame', "bi-endgame-close",'#display-endgame');
        }
    }

    if (e.target.closest('.normal-content')) {
        let parent = e.target.closest('.normal-content');
        let listContent = getData('content').slice(0, 3);
        let html = "";

        document.querySelectorAll('.content')
            .forEach(f => {
                f.classList.remove('bg-content')
            })
        parent.classList.add('bg-content')

        listContent.forEach(el => {
            html += renderContent(el);
        })

        document.querySelector('#content-container').innerHTML = html;
        document.querySelector('#content-pagination').innerHTML = "";
    }
    if (e.target.closest('.end-game-content')) {
        let parent = e.target.closest('.end-game-content');
        let listContent = getData('content');
        saveData('endgameContent', listContent.slice(3, listContent.length));

        document.querySelectorAll('.content')
            .forEach(f => {
                f.classList.remove('bg-content')
            })
        parent.classList.add('bg-content');

        pagination(
            getData, 'endgameContent', renderContent, '#content-container',
            '#content-pagination', {
                pageSlide: 5, returnHead: false,
            btnPrev: "btn-prev-content", btnNext: "btn-next-content", slidePage: 'slideContent'
        }
        );
    }
    if (e.target.closest('.btn-save-form--content')) {
        let newContent = getData('content') || [];
        let isValid = true;

        const formContents = {
            iconContent: `../images/icon-content/${iconContent}`,
            nameContent: document.querySelector('#input-content').value,
            priceContent: document.querySelector('#input-content-price').value * 10e2,
            unitContent: document.querySelector('#input-content-unit').value
        };

        const checks = [
            { inputId: "#input-content", errId: "#errContent" },
            { inputId: "#input-content-price", errId: "#errContentPrice" },
            { inputId: "#input-content-unit", errId: "#errContentUnit" }
        ]

        if (iconContent.length === 0) {
            document.querySelector('#errIconContent').innerHTML = "Chưa chọn icon";
            isValid = false;
        }

        checks.forEach(el => {
            if (!validEmptyValue(el.inputId, el.errId))
                isValid = false;
        })

        if (!isValid) return;
        newContent.push(formContents);
        saveData('content', newContent)

        hideModal('#modalAddContentQuest');
        document.querySelector('#form-container').reset();
        showNotice('Thêm content thành công');
    }
    if (e.target.closest('.btn-save-form--map')) {
        let listMap = getData('listMap') || [];
        let isValid = true;
        const formMaps = {
            area: document.querySelector('#input-map').value,
            totalMap: document.querySelector('#input-total-map').value,
            price: document.querySelector('#input-map-price').value * 10e2
        }
        const checks = [
            { inputId: "#input-map", errId: "#errInputMap" },
            { inputId: "#input-total-map", errId: "#errTotalMap" },
            { inputId: "#input-map-price", errId: "#errMapPrice" }
        ]

        checks.forEach(el => {
            if (!validEmptyValue(el.inputId, el.errId))
                isValid = false;
        })

        if (!isValid) return;

        listMap.push(formMaps);
        saveData('listMap', listMap);

        showNotice('Thêm khu vực mới thành công');
        document.querySelector('#form-container').reset();
        hideModal('#modalAddContentQuest');
    }
    if (e.target.closest('.select-form')) {
        let currentStateSelect = document.querySelector('.icon-form-select');
        if (currentStateSelect.classList.contains('icon-down'))
            currentStateSelect.classList.remove('icon-down');
        else
            currentStateSelect.classList.add('icon-down');
    }
    if (e.target.closest('#add-content-quest')) {
        document.querySelector('.display-form').innerHTML = "Content game"
        document.querySelector('#form-container').innerHTML = renderFormType("content").content;
        document.querySelector('#form-save').innerHTML = renderFormType("content").form_save_type;
        document.querySelector('.fake-input').disabled = true; ``
    }
    if (!e.target.closest('.select-form') && e.target.closest('.modal-body')) {
        let currentStateSelect = document.querySelector('.icon-form-select');
        if (currentStateSelect.classList.contains('icon-down'))
            currentStateSelect.classList.remove('icon-down');
    }
})