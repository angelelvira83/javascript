function titleCase(str) {
    let esplit = str.split(" ");
    let result = "";
    
    for (let i = 0; i < esplit.length; i++) {
      result = result + esplit[i][0].toUpperCase() 
      + esplit[i].substring(1).toLowerCase() + " ";
    }
  
  
    return result;
  }

  function titleCase2(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
  
  console.log(titleCase("I'm a little tea pot"));
    
  console.log(titleCase2("I'm a little tea pot"));
  