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


module.exports = { age, graduation };