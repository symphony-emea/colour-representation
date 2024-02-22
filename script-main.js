'use strict';

const container_table = document.querySelector('.container-table');

const submitBtn = document.querySelector('.submit-btn');

const countries_div = document.querySelector('.countries .inner-wrap');
const countries_btn = document.querySelector('.country-btn');

const model_div = document.querySelector('.models .inner-wrap');
const model_btn = document.querySelector('.model-btn');

// const storages_div = document.querySelector('.storages .inner-wrap');
// const storages_btn = document.querySelector('.storage-btn');

function addValuesToBtn({ arr: arr, btn: btn, div_class: div_class, div: div }) {
    arr.forEach((name, index) => {
        if (index == 0) {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Search..');
            input.setAttribute('id', 'myInput' + div_class.split(".")[1]);
            input.setAttribute('onkeyup', "filterFunction('" + div_class.split(".")[1] + "')");
            input.classList.add('myInput');
            div.appendChild(input);
        }
        if (index == 0) {
            let name_1 = "Select All";
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');

            label.setAttribute('for', div_class + " " + name_1);
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', div_class + " " + name_1);
            input.setAttribute('value', name_1);
            input.classList.add('ckkBox');
            input.classList.add('all')
            span.textContent = name_1;

            label.appendChild(input);
            label.appendChild(span);
            label.innerHTML += '<br>';
            div.appendChild(label);
        }
        let name_1 = name;
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');

        label.setAttribute('for', name_1);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', name_1);
        input.setAttribute('value', name_1);
        input.classList.add('ckkBox');
        input.classList.add('val');
        span.textContent = name_1;

        label.appendChild(input);
        label.appendChild(span);
        // label.innerHTML += '<br>';
        div.appendChild(label);
    });

    btn.addEventListener('click', (e) => {
        let check = document.querySelector(div_class + " .checkboxes");
        check.classList.toggle('active');
    });

    document.querySelector(div_class + " .inner-wrap").addEventListener('mouseleave', (e) => {
        let check = document.querySelector(div_class + " .checkboxes");
        check.classList.remove('active');
    });

    // btn.addEventListener('mouseover', (e) => {
    //     let check = document.querySelector(div_class + " .checkboxes");
    //     check.classList.add('active');
    // });

    // document.querySelector(div_class + " .checkboxes").addEventListener('mouseout', (e) => {
    //     let check = document.querySelector(div_class + " .checkboxes");
    //     check.classList.remove('active');
    // });
    const checkboxUnTicked = document.querySelectorAll(div_class + ' #Categories .ckkBox.val');
    const checkBoxAll = document.querySelector(div_class + ' .all');

    for (let i = 0; i < checkboxUnTicked.length; i++) {
        checkboxUnTicked[i].addEventListener('click', function () {
            const select = document.querySelectorAll(div_class + ' #Categories .ckkBox.val:checked')
            if (select.length == checkboxUnTicked.length) {
                checkBoxAll.checked = true;
            } else checkBoxAll.checked = false;
        });
    }

    checkBoxAll.addEventListener('click', function () {
        if (checkBoxAll.checked == true) {
            checkboxUnTicked.forEach((s) => s.checked = true);
        } else checkboxUnTicked.forEach((s) => s.checked = false);
    });
}
//-------------------------------------------------------------------------------------------------------------//
function filterFunction(className) {
    var input, div, filter, label, i, txtValue;
    input = document.querySelector(`#myInput${className}`);
    filter = input.value.toUpperCase();
    div = document.querySelector(`.${className} #Categories .inner-wrap`);
    label = div.querySelectorAll("label");
    for (i = 0; i < label.length; i++) {
        txtValue = label[i].textContent || label[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            label[i].style.display = "";
        } else {
            label[i].style.display = "none";
        }
    }
}
//-------------------------------------------------------------------------------------------------------------//
const file_path = "./colors.csv";
//-------------------------------------------------------------------------------------------------------------//
fetch(file_path).then(res => res.text()).then(data => {
    const dataArr = data.trim().split("\n").map(row => row.replace("\r", "").split(",")).slice(1);

    const countries = [...new Set(dataArr.map(row => row[0]).sort())];
    addValuesToBtn({ arr: countries, btn: countries_btn, div_class: '.countries', div: countries_div });

    const models = [...new Set(dataArr.map(row => row[2].toLowerCase()))];
    drawTable({
        dataArr: dataArr,
        countries_filter: [countries[Math.floor(Math.random() * countries.length)]],
        // models_filter: [models[Math.floor(Math.random() * models.length)]],
        models_filter: models,
    });

    document.querySelector(".countries .inner-wrap").addEventListener('mouseleave', (e) => {
        const country = document.querySelectorAll('.countries #Categories .ckkBox.val:checked');
        let values = [];
        country.forEach(c => values.push(c.value));
        if (values.length > 0) {
            const models = [...new Set(dataArr.filter(row => values.includes(row[0])).map(row => row[2].toLowerCase()))];
            model_div.innerHTML = "";
            addValuesToBtn({
                arr: models.map(m => {
                    let word_1 = [];
                    m.split(" ").forEach((word, index) => {
                        if (word.startsWith("i")) {
                            word_1.push(word);
                        } else {
                            word_1.push(word.charAt(0).toUpperCase() + word.slice(1));
                        }
                    })
                    return word_1.join(" ");

                }),
                btn: model_btn,
                div_class: '.models',
                div: model_div
            });
        }
    });
    countries_btn.addEventListener('click', (e) => {
        const country = document.querySelectorAll('.countries #Categories .ckkBox.val:checked');
        let values = [];
        country.forEach(c => values.push(c.value));
        if (values.length > 0) {
            const models = [...new Set(dataArr.filter(row => values.includes(row[0])).map(row => row[2].toLowerCase()))];
            model_div.innerHTML = "";
            addValuesToBtn({
                arr: models.map(m => {
                    let word_1 = [];
                    m.split(" ").forEach((word, index) => {
                        if (word.startsWith("i")) {
                            word_1.push(word);
                        } else {
                            word_1.push(word.charAt(0).toUpperCase() + word.slice(1));
                        }
                    })
                    return word_1.join(" ");

                }),
                btn: model_btn,
                div_class: '.models',
                div: model_div
            });
        }
    });
    // addValuesToBtn({
    //     arr: models.map(m => {
    //         let word_1 = [];
    //         m.split(" ").forEach((word, index) => {
    //             if (word.startsWith("i")) {
    //                 word_1.push(word);
    //             } else {
    //                 word_1.push(word.charAt(0).toUpperCase() + word.slice(1));
    //             }
    //         })
    //         return word_1.join(" ");

    //     }), btn: model_btn, div_class: '.models', div: model_div
    // });

    // model_btn.addEventListener('click', (e) => {
    //     const model = document.querySelectorAll('.models #Categories .ckkBox.val:checked');
    //     var val = model[0]?.value.toLowerCase();
    //     console.log(val);
    //     if (val) {
    //         const storage = [...new Set(dataArr.filter(row => row[5].toLowerCase() == val).map(row => row[6]).sort())];
    //         storages_div.innerHTML = "";
    //         addValuesToBtn({ arr: storage, btn: storages_btn, div_class: '.storages', div: storages_div });
    //     }
    // });
    // model_div.addEventListener('mouseleave', (e) => {
    //     const model = document.querySelectorAll('.models #Categories .ckkBox.val:checked');
    //     var val = model[0]?.value.toLowerCase();
    //     console.log(val);
    //     if (val) {
    //         const storage = [...new Set(dataArr.filter(row => row[5].toLowerCase() == val).map(row => row[6]).sort())];
    //         storages_div.innerHTML = "";
    //         addValuesToBtn({ arr: storage, btn: storages_btn, div_class: '.storages', div: storages_div });
    //     }
    // });

    submitBtn.addEventListener('click', (e) => {
        // container_table.innerHTML = "";
        const country_select = document.querySelectorAll('.countries #Categories .ckkBox.val:checked');
        const model_select = document.querySelectorAll('.models #Categories .ckkBox.val:checked');
        // const storage = document.querySelectorAll('.storages #Categories .ckkBox.val:checked');

        const countryArrSelect = [];
        const modelArrSelect = [];
        // const storageArr = [];

        country_select.forEach((c) => countryArrSelect.push(c.value));
        model_select.forEach((p) => modelArrSelect.push(p.value));
        // storage.forEach((s) => storageArr.push(s.value));

        console.log("Country Selected", countryArrSelect);
        console.log("Model Selected", modelArrSelect);
        // console.log(storageArr);

        countries_btn.textContent = "Country: " + countryArrSelect.map(c => c).join(", ");
        model_btn.textContent = "Model: " + modelArrSelect.map(m => m).join(", ");
        // storages_btn.textContent = "Storage: " + storageArr[0];

        // console.clear();

        drawTable({
            dataArr: dataArr,
            country: countries,
            model: models.map(m => m.toLowerCase()),
            // model: modelArrSelect,
            // storage: storageArr,
            countries_filter: countryArrSelect,
            models_filter: modelArrSelect.map(m => m.toLowerCase()),
            // storages_filter: storage
        });
    });
});

//-------------------------------------------------------------------------------------------------------------//
let color_code_by_brands = {
    "i13": {
        "Red": "#A50011",
        "Pink": "#FAE0D8",
        "Blue": "#215E7C",
        "Green": "#364935",
        "Midnight": "#171E27",
        "Starlight": "#F9F3EE",
        "(PRODUCT) Red": "#FF3B30",
        "PRODUCT (Red)": "#FF3B30",
        "Star White": "#FF3B30",
    },

    "i13 pro": {
        "Graphite": "#5C5B57",
        "Gold": "#F9E5C9",
        "Silver": "#F5F5F0",
        "Sierra Blue": "#9BB5CE",
        "Alpine Green": "#505F4E",
        "(PRODUCT) RED": "#FF3B30",
        "PRODUCT (Red)": "#FF3B30",
        "mountain blue": "#4E6CB4",
        "Graphite Grey": "##46494F",
        "Daylight blue": "#26c3db",
        "Mountain pine green": "#01796F",
        "strong graphite": "#5d5e67",



    },

    "i13 pro max": {
        "Graphite": "#5C5B57",
        "Gold": "#F9E5C9",
        "Silver": "#F5F5F0",
        "Sierra Blue": "#9BB5CE",
        "Alpine Green": "#505F4E",
        "mountain blue": "#4E6CB4",
        "Daylight blue": "#26c3db",
        "Graphite Grey": "##46494F",
        "Daylight blue": "#26c3db",
        "Mountain pine green": "#01796F",
        "strong graphite": "#5d5e67",
    },

    "i13 mini": {
        "Red": "#A50011",
        "Pink": "#FAE0D8",
        "Blue": "#215E7C",
        "Green": "#364935",
        "Midnight": "#171E27",
        "Starlight": "#F9F3EE",
        "(PRODUCT) Red": "#FF3B30",
        "PRODUCT (Red)": "#FF3B30",
        "Star white": "#F9FFFA",
        "Midnight Black": "##00040D",
    },

    "i14": {
        "Midnight": "#343b43",
        "(PRODUCT) Red": "#fb1230",
        "PRODUCT (Red)": "#FF3B30",
        "Starlight": "#faf7f2",
        "Gelb" : "#FFFF00",
    },
    "i14 plus": {
        "Midnight": "#343b43",
        "(PRODUCT) Red": "#fb1230",
        "PRODUCT (Red)": "#FF3B30",
        "Starlight": "#faf7f2",
        "Gelb" : "#FFFF00",
    },
    "i14 pro": {
        "Deep Purple": "#5D3FD3",
        "Golden": "#FFD700",
        "Space Black": "#0A0A0A",
        "Silver": "#F5F5F0",
        "Golden" : "#FFD700",
    },
    "i14 pro max": {
        "Deep Purple": "#5D3FD3",
        "Golden": "#FFD700",
        "Space Black": "#0A0A0A",
        "Silver": "#F5F5F0",
        "Golden" : "#FFD700",
    },
    "ise3": {
        "Star white": "#F9FFFA",
        "Moon light": "#FFF8DE",
        
    },
    "i12 Pro": {
        "Graphite Grey": "##46494F",
        "Pacific Blue": "#83B0D6",        
    },
    "i12 Pro Max": {
        "Graphite Grey": "##46494F",
        "Pacific Blue": "#83B0D6",        
    },
    "ise2": {
        "Star white": "#F9FFFA",
    },
    

};
color_code_by_brands = Object.keys(color_code_by_brands).reduce((acc, key) => {
    acc[key.toLowerCase()] = Object.keys(color_code_by_brands[key]).reduce((acc1, key1) => {
        acc1[key1.toLowerCase()] = color_code_by_brands[key][key1];
        return acc1;
    }, {});
    return acc;
}, {});
console.log(color_code_by_brands);
//-------------------------------------------------------------------------------------------------------------//
let color_code = {
    "Graphite": "#5C5B57",
    "Lime": "#dce9be",
    "Violet": "#b9b7d4",
    "White": "#FBF7F4",
    "Black": "#000000",
    "Mint": "#d3e4da",

    "Awesome Black": "#1E1E1E",
    "Awesome Blue": "#9bc9e1",
    "Awesome Peach": "#FFD38C",
    "Awesome White": "#fffffd",
    "Awesome Lime": "#dce9be",
    "Awesome Graphite": "#5C5B57",
    "Awesome Silver": "#F5F5F0",

    "Peach": "#FFDAB9",
    "Midnight": "#171E27",
    "Polaris": "#E1E3E4",
    "Red": "#A50011",
    "Rose": "#e2afac",
    "Gold": "#F9E5C9",
    "Silver": "#F5F5F0",
    "Dark Purple": "#301934",
    "Space Black": "#0A0A0A",

    "Titan purple": "#e0cff0",
    "Titanium Black": "#373634",
    "Titanium Grey": "#A0A0A0",
    "Titanium Violet": "#A200FF",
    "Titanium Yellow": "#FFD800",

    "Titanium Blue": "#00A2FF",
    "Titanium Green": "#00A86B",
    "Titanium Orange": "#FF5E00",

    "Titanium Natural": "#D3B58C",
    "Titanium White": "#F1F1F1",
    "Titanium Blue": "#00A2FF",

    "Onyx Black": "#474747",
    "Marble Grey": "#D3D3D3",
    "Cobalt Violet": "#8A2BE2",
    "Cobalt purple": "#8A2BE2",
    "Amber Yellow": "#FFBF00",

    "(PRODUCT) Red": "#FF3B30",
    "PRODUCT (Red)": "#FF3B30",
    "Starlight": "#F9F3EE",
    "Phantom Pink": "#ecbcb8",
    "Phantom White": "#F8F8FF",
    "Lavender": "#E6E6FA",
    "Olive": "#808000",
    "Olive Green": "#BAB86C",

    "Phantom Black": "#000000",
    "Phantom Brown": "#836953",
    "Phantom Silver": "#C0C0C0",
    "Phantom Titanium": "#C0C0C0",

    "Sapphire Blue": "#0F52BA",
    "Jade Green": "#00A86B",
    "Sandstone Orange": "#FF4500",

    "Orange": "#FFA500",
    "Cream": "#FFFDD0",
    "Pink Gold": "#FFCCCB",
    "Burgundy": "#800020",
    "Purple": "#B8AFE6",
    "Grey": "#808080",
    "Pink": "#FAE0D8",
    "Beige": "#F5F5DC",
    "Starburst": "#D4AF37",
    "Deep Purple": "#5D3FD3",
    "Icy Blue": "#4E8EF7",
    "Alpine Green": "#505F4E",
    "Sierra Blue": "#9BB5CE",
    "Black Titanium": "#333333",
    "White Titanium": "#E3E3E3",
    "Light Green": "#dce9be",
    "Light Purple": "#B19CD9",
    "Awesome Violet": "#7D1B7E",
    "Star Skin": "#FFD700",
    "Star Shine": "#FFFFE0",
    "Star Black": "#000000",
    "Brown": "#A52A2A",
    "Navy": "#000080",
    "Pee": "#FFFF00",
    "Awesome Mint": "#c2dbd5",
    "Gold Pink": "#FF91A4",

    "Phantom Violet": "#9896b9",
    "Phantom Grey": "#424448",
    "Phantom Navy": "#3a6294",
    "Burgundy": "#9c747c",
    "Green": "#45635e",
    "Sky blue": "#afd8ee",
    "Phantom Red": "#b74d39",
    "Phantom Gold": "#f5cac4",
    "Phantom Green": "#7fbc93",
    "Bora Purple": "#a6a2c2",
    "Blue": "#b9c4da",
    "Grey Green": "#364147",
    "Natural Titanium": "#b7b1ac",
    "Blue Titanium": "#6b7382",
    "Yellow": "#f9e379",
    "Rose Gold" : "#b76e79",
    "Indigo" : "#4B0082",
    "Tangerine" : "#f28500",
    "Golden Pink" : "#B76E79",
    "Volatile Black" : "#2e2f31",
    "Phantom Lavender" : "#f1e2f7",
    "Bordeaux" : "	#4C1C24",
    "Ice Blue" : "739BD0",
    //"Gaffe" : "",
    "Sand" : "#c2b280",
};
color_code = Object.keys(color_code).reduce((acc, key) => {
    acc[key.toLowerCase()] = color_code[key];
    return acc;
}, {});
console.log(color_code);
//-------------------------------------------------------------------------------------------------------------//
function drawTable({
    dataArr: dataArr,
    country: countries,
    model: models,
    // storage: storageArr,
    countries_filter: countryArrSelect,
    models_filter: modelArrSelect,
    // storages_filter: storage
}) {

    container_table.innerHTML = "";
    const table_data = {};
    // const filteredData = dataArr;
    const filteredData = dataArr.filter((row) => {
        return countryArrSelect.includes(row[0])
            && modelArrSelect.includes(row[2].toLowerCase())
        //     // && storageArr.includes(row[6]);
    });

    const brands = [...new Set(filteredData.map(row => row[1]))];

    if ((brands.includes("Google") || brands.includes("google")))
        brands.splice(brands.indexOf("Google"), 1);

    let max = 0;

    countryArrSelect.forEach((country) => {
        table_data[country] = {};
        let filteredDataTempCount = filteredData.filter(row => row[0] == country);
        brands.forEach((brand) => {
            table_data[country][brand] = {};
            let filteredDataTempBrand = filteredDataTempCount.filter(row => row[1] == brand);
            const models_new = [...new Set(filteredDataTempBrand.map(row => row[2].toLowerCase()))];
            models_new.forEach((model) => {
                table_data[country][brand][model] = {};
                const storage_new = [...new Set(filteredDataTempBrand.filter(row => row[2].toLowerCase() == model.toLowerCase()).map(row => row[3]))];
                storage_new.forEach((storage) => {
                    table_data[country][brand][model][storage] = [];

                    [...new Set(...filteredDataTempBrand.filter(row => row[2].toLowerCase() == model.toLowerCase() && row[3] == storage))]
                        .filter(r => r != undefined && r != null && r != "")
                        .forEach((row, index) => {
                            if (index >= 4) table_data[country][brand][model][storage].push({
                                color_name: row.toLowerCase(),
                                color_name_original: row,
                                hex_code: color_code[row.toLowerCase()] != undefined ? color_code[row.toLowerCase()] :
                                    color_code_by_brands[model.toLowerCase()] != undefined ?
                                        color_code_by_brands[model.toLowerCase()][row.toLowerCase()] : "white"
                            });
                        });

                    table_data[country][brand][model][storage] = table_data[country][brand][model][storage].sort((a, b) => calculateBrightness(a.hex_code) - calculateBrightness(b.hex_code));

                    if (max < table_data[country][brand][model][storage].length) max = table_data[country][brand][model][storage].length;
                });
            });
        });
    });

    console.log(table_data);

    if (Object.keys(table_data).length != 0) {
        countryArrSelect.forEach((country) => {
            const div_country = document.createElement('div');
            div_country.className = "country";
            const country_heading = document.createElement('h2');
            country_heading.innerText = country;
            div_country.appendChild(country_heading);
            const div_tables = document.createElement('div');
            div_tables.className = "tables-div";
            brands.forEach((brand) => {
                // let max = [...new Set(...Object.keys(table_data[country][brand]).map(model => Object.keys(table_data[country][brand][model]).map(storage => table_data[country][brand][model][storage].length)))].sort((a, b) => b - a)[0];
                const div_container = document.createElement('div');
                div_container.className = "one-table";
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                let img_div = document.createElement('div');
                let img = document.createElement('img');
                img.src = brand == "Apple" ? "apple.png" : "samsung.png";
                img.setAttribute('colspan', max + 2);
                img_div.appendChild(img);
                div_container.appendChild(img_div);

                let tr = document.createElement('tr');
                let th_model = document.createElement('th');
                th_model.innerText = "Model";
                tr.appendChild(th_model);
                thead.appendChild(tr);

                let th_storage = document.createElement('th');
                th_storage.innerText = "Storage";
                tr.appendChild(th_storage);

                for (let i = 0; i < max; i++) {
                    let th_storage = document.createElement('th');
                    // th_storage.innerText = "Color" + (i + 1);
                    th_storage.innerText = "";
                    tr.appendChild(th_storage);
                    thead.appendChild(tr);
                }

                Object.keys(table_data[country][brand]).forEach((model) => {
                    Object.keys(table_data[country][brand][model]).forEach((storage, index) => {
                        let tr = document.createElement('tr');
                        if (index == 0) {
                            let td_model = document.createElement('td');
                            td_model.style.borderTop = "1px solid #000000";
                            td_model.style.position = "sticky";
                            td_model.style.left = "0";
                            td_model.style.backgroundColor = "#ffffff";
                            td_model.setAttribute('rowspan', Object.keys(table_data[country][brand][model]).length);
                            let word_1 = [];
                            model.split(" ").forEach((word, index) => {
                                if (word.startsWith("i")) {
                                    word_1.push(word);
                                } else {
                                    word_1.push(word.charAt(0).toUpperCase() + word.slice(1));
                                }
                            });
                            td_model.innerText = word_1.join(" ");
                            tr.appendChild(td_model);
                        }
                        if (index == Object.keys(table_data[country][brand][model]).length - 1) {
                            tr.style.borderBottom = "1px solid #000000";
                        }
                        let td_storage = document.createElement('td');
                        td_storage.style.position = "sticky";
                        td_storage.style.left = "70px";
                        td_storage.style.backgroundColor = "#ffffff";
                        td_storage.innerText = storage;
                        tr.appendChild(td_storage);
                        for (let i = 0; i < max; i++) {
                            let td_color = document.createElement('td');
                            if (table_data[country][brand][model][storage][i] != undefined) {
                                td_color.innerText = table_data[country][brand][model][storage][i].color_name_original;
                                td_color.style.backgroundColor = table_data[country][brand][model][storage][i].hex_code;
                                td_color.style.color = getContrastColor(table_data[country][brand][model][storage][i].hex_code);
                            } else {
                                td_color.innerText = "";
                            }
                            tr.appendChild(td_color);
                        }
                        tbody.appendChild(tr);
                    });
                });
                table.appendChild(thead);
                table.appendChild(tbody);
                div_container.appendChild(table);
                div_tables.appendChild(div_container);
            });
            div_country.appendChild(div_tables);
            container_table.appendChild(div_country);
        });
    }
}

function getContrastColor(hexColor) {
    if (hexColor == undefined) return;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function calculateBrightness(hex) {
    if (hex == undefined) return;
    const [r, g, b] = hexToRgb(hex);
    return 0.299 * r + 0.587 * g + 0.114 * b;
}
