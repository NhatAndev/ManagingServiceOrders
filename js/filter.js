import { initFilterOrder, initSortedOrder } from "./init.js";
import { pagination } from "./pagination.js";
import { 
    renderCompleteListOrder,
    renderProgressListOrder 
} from "./render.js";
import { getData, saveData } from "./storage.js"

const initFilter = initFilterOrder();
const initSorted = initSortedOrder();

// lấy trạng thái để lọc
document.querySelector('#progress-order')
.addEventListener('click', () => {
    saveData('currentTab', "đang cày");
    saveData('currentList', []);
})


document.querySelector('#complete-order')
.addEventListener('click', () => {
    saveData('currentTab', "hoàn thành");
    saveData('currentList', []);
})


document.querySelector('#home')
.addEventListener('click', () => {
    saveData('currentTab', "");
    saveData('currentList', []);
})



function renderFilterList(filterMethod, callback)
{
    let html = "";
    const currentTab = getData('currentTab') ?? "";
    const listFilter = (currentTab === "đang cày")? getData('progressListOrder') : getData('completeOrder');
    const funcRender = (currentTab === "đang cày")? renderProgressListOrder : renderCompleteListOrder;
    const currentList = filterMethod.call(listFilter, callback);
    
    if(!listFilter) return;
    
    currentList.forEach(e => {
        html += funcRender(e)
    })
    saveData('currentList', currentList);

    if(currentList.length === 0)
    {
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
        document.querySelector('.wrapper-scroll').classList.remove('wrapper-custom');
        document.querySelector('#pagination').innerHTML = "";
    }
    else
    {
        document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');
        pagination(getData, 'currentList', funcRender, '#list-order', '#pagination',
            {btnPrev: 'btn-prev-filter', btnNext: 'btn-next-filter'}
        );
        
    }
}

function renderSortList(callback) {
    const currentTab = getData('currentTab') ?? "";
    const funcRender = (currentTab === "đang cày")? renderProgressListOrder : renderCompleteListOrder;
    
    const currentList = getData('currentList') || [];
    
    const sortedList = currentList.sort(callback);
    saveData('currentList', sortedList);

    if(currentList.length === 0) 
    {
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
                                danh sách lọc rỗng hoặc chưa có đơn nào được lọc
                            </h4>
                            <h4>
                                Các đơn lọc theo giá sẽ được hiển thị tại đây
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
    else 
    {
        document.querySelector('.wrapper-scroll').classList.add('wrapper-custom');
        pagination(getData, 'currentList', funcRender, '#list-order', '#pagination',
            {btnPrev: 'btn-prev-sort', btnNext: 'btn-next-sort'}
        );
    }
}


document.addEventListener('click', e =>{
    if(e.target.closest('#filter'))
    {
        document.querySelector('#list-order').classList.add('is-filter');
        initFilter.forEach(f => {
            if(e.target.closest(f.idFilter))
            {
                renderFilterList(Array.prototype.filter, f.callback);
            }
        })
    }

    if(e.target.closest('#sort'))
    {
        initSorted.forEach(f => {
            if(e.target.closest(f.idFilter))
            {
                renderSortList(f.callback);
            }
        })
    }
})