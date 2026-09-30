export function pagination(glo, ol, renderList, containerId, 
    paginationContainer, {pageSlide = 9, 
    returnHead = true, btnPrev, btnNext, slidePage = 'slidePage'} = {}) 
{
    let currentSlide = 1;
    const eachSlide = pageSlide;
    let totalSlide = Math.ceil(Number(glo(ol).length) / eachSlide);

    function renderCurrentListOrder(crSlide) {
        let startOrder = (crSlide - 1) * eachSlide;
        let endOrder = startOrder + eachSlide;
        let newArr = glo(ol).slice(startOrder, endOrder);
        let html = "";

        newArr.forEach(e => {
            html += renderList(e);
        });

        document.querySelector(containerId).innerHTML = html;
        document.querySelector(paginationContainer).innerHTML = `
            <button class="col-1 btn ${btnPrev} btn-pagination text-white">
                <i class="bi bi-caret-left-fill"></i>
            </button>
            <div id="${slidePage}" class="col-2 d-flex justify-content-center align-items-center"> 
                <p class="m-0 p-0 fw-bold">${currentSlide} / ${totalSlide}</p>
            </div>
            <button class="col-1 btn ${btnNext} btn-pagination text-white">
                <i class="bi bi-caret-right-fill"></i>
            </button>
        `
        document.querySelector("." + btnPrev).addEventListener('click', () => {
            if(returnHead) document.querySelector('.wrapper-custom').scrollTo(0, 0);
            if(currentSlide <= 1) return;
            else
            {
                renderCurrentListOrder(--currentSlide);

                document.querySelector('#' + slidePage).innerHTML = `
                    <p class="m-0 p-0 fw-bold">${currentSlide} / ${totalSlide}</p>
                `
            }
        })
        document.querySelector("." + btnNext).addEventListener('click', () => {
            if(returnHead) document.querySelector('.wrapper-custom').scrollTo(0, 0);
            if(currentSlide >= totalSlide) return;
            else
            {
                renderCurrentListOrder(++currentSlide);
            
                document.querySelector('#' + slidePage).innerHTML = `
                    <p class="m-0 p-0 fw-bold">${currentSlide} / ${totalSlide}</p>
                `
            }
        })
    }
    renderCurrentListOrder(currentSlide);
}