function stringToAscii(str){
    var emptystring = ''
    for (var i = 0; i < str.length; i++) {
        emptystring += str.charCodeAt(i) + " "
    }

    return emptystring
}
