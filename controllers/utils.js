function age (dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
};

function graduation (num) {
    switch(num) {
        case "1":
            return "Ensino Médio Completo";
        case "2":
            return "Ensino Superior Completo";
        case "3":
            return "Mestrado";
        case "4":
            return "Doutorado";
        default:
            return "";
    }
};

function grade (num) {
    switch(num) {
        case "1":
            return "5º ano do ensino fundamental";
        case "2":
            return "6º ano do ensino fundamental";
        case "3":
            return "7º ano do ensino fundamental";
        case "4":
            return "8º ano do ensino fundamental";
        case "5":
            return "9º ano do ensino fundamental";
        case "6":
            return "1º ano do ensino médio";
        case "7":
            return "2º ano do ensino médio";
        case "8":
            return "3º ano do ensino médio";
        default:
            return "";
    }
};


module.exports = { age, graduation, grade };