import { removeErrById, server, showErrInputById } from "./index.js";
import { getData } from "./storage.js";

export function validUID() {
    const inputValue = document.querySelector('#inputUID');
    const regexUID = /^\d{9}$/;

    if (inputValue.value === "") return showErrInputById('#errUID', 'Chưa nhập UID');
    else if (!regexUID.test(Number(inputValue.value))) return showErrInputById('#errUID', 'UID không phù hợp');

    return removeErrById('#errUID');
}

export function validLevel() {
    const inputValue = Number(document.querySelector('#inputLevel').value);
    if (document.querySelector('#inputLevel').value === "") return showErrInputById('#errLevel', 'Chưa nhập level');
    else if (inputValue < 0 || inputValue > 80) return showErrInputById('#errLevel', 'UL không hợp lệ')
    else return removeErrById('#errLevel')
}

export function validPayMoney() {

    let checked = document.querySelector('.form-check input[name="payMoney"]:checked');
    if (!checked) return showErrInputById('#errPayMoney', 'Hãy chọn trạng thái thanh toán');
    else removeErrById('#errPayMoney');

    return checked.value;
}


export function validEmptyValue(inputId, errId) {
    const inputValue = document.querySelector(inputId).value;
    if (inputValue === "") return showErrInputById(errId, 'Chưa nhập vào lựa chọn');

    return removeErrById(errId);
}

export function validSever() {
    if (server === "")
        return showErrInputById('#errSever', "Chưa chọn server");
    return removeErrById('#errSever');
}

export function validAvailableArea() {
    const areas = getData('listMap');
    let area = "";
    let mapCount = "";
    let isValid = true;
    let res = {};

    function validArea(areas) {
        const inputArea = document.querySelector('#inputArea').value;

        if (inputArea === "") return showErrInputById('#errArea', 'Chưa chọn khu vực');
        else if (!areas.find(ar => ar.area === inputArea)) return showErrInputById('#errArea', 'Không tìm thấy khu vực này');
        else
        {
            area = inputArea;
        }
        return removeErrById('#errArea');
    }

    function validMapCount(areas) {
        const inputMapCount = document.querySelector('#inputMapCount').value;
        let validAreaMapCount = areas.find(ar => ar.area === area && Number(inputMapCount) <= ar.totalMap);

        if (inputMapCount === "") return showErrInputById('#errMapCount', 'Chưa chọn số lượng map');
        else if (!validAreaMapCount)
        {
            let currentArea = ""
            areas.forEach(el => {
                if(el.area === area) currentArea = el;
            })
            
            return showErrInputById('#errMapCount', `Khu vực ${currentArea.area} chỉ có tối đa ${currentArea.totalMap} map`);
        }
        else if (area !== "không" && Number(inputMapCount) === 0)
            return showErrInputById("#errMapCount", "Không được nhập số lượng map là 0")
        else {
            mapCount = inputMapCount;
            res = areas.find(ar => ar.area === area && mapCount <= ar.totalMap);
        }
        return removeErrById('#errMapCount');
    }

    if(!validArea(areas))
    {
        isValid = false;
        return;
    }
    if(!validMapCount(areas))
        isValid = false;
    
    if(isValid)
    {
        validArea(areas);
        validMapCount(areas);
        return res;
    }
    else return isValid;
}

function validCurrentVersion() {
    const currentVersion = getData('currentVersion');

    if(currentVersion === "" || currentVersion === null) return showErrInputById('#errVersion', "Chưa cập nhật phiên bản");
    return removeErrById('#errVersion');
}

export function validInput()
{
    const validators = [
        validUID(),
        validLevel(),
        validSever(),
        validAvailableArea(),
        validCurrentVersion(),
        validEmptyValue('#inputHolo', '#errHolo'),
        validEmptyValue('#inputQuest', '#errQuest'),
        validEmptyValue('#inputEvent', '#errEvent'),
        validEmptyValue('#inputMatrix', '#errMatrix'),
        validEmptyValue('#input-end-game', '#errEndGame'),
        validPayMoney(),
    ];
    
    return validators.every(Boolean);
}