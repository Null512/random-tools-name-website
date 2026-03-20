import { UI } from '../ui.js';

export const GibberishFixerCard = {
    mapEn: "`qwertyuiop[]asdfghjkl;'zxcvbnm,./~QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?",
    mapRu: "ёйцукенгшщзхъфывапролджэячсмитьбю.ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,",
    init() {
        document.getElementById('gib-input').addEventListener('input', () => this.fix());
        document.getElementById('gib-dir').addEventListener('change', () => this.fix());
    },
    fix() {
        const val = document.getElementById('gib-input').value;
        const dir = document.getElementById('gib-dir').value;
        let res = '';
        let fromMap = dir === 'en2ru' ? this.mapEn : this.mapRu;
        let toMap = dir === 'en2ru' ? this.mapRu : this.mapEn;

        for(let i=0; i<val.length; i++) {
            let idx = fromMap.indexOf(val[i]);
            res += idx !== -1 ? toMap[idx] : val[i];
        }
        document.getElementById('gib-res').innerText = res;
    }
}
