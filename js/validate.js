function checkNameCourse(selector,messageError){
    return{
        selector:selector,
        test:function(content){
           let findCourse=listCourses.find(function(e){
                return e.nameCourse==content;
            });
            return findCourse?messageError:undefined;
        }
    }
}
function required(selector,messageError){
    return{
        selector:selector,
        test:function(content){
            return  content!=""?undefined:messageError;
        }
    }
}
function checkCategoryCoursesList(selector,messageError){
    return{
        selector:selector,
        test:function(content){
            return content=="Chọn danh mục"?messageError:undefined;
        }

    }
}
function isImage(url) {
    var img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
}
function checkLinkImage(selector,messageError){
    return{
        selector:selector,
        test:function(content){
            return isImage(content)?undefined:messageError;
        }
    }
}
function validation(objects){
    objects.form.addEventListener('submit',function(e){
        e.preventDefault();
        let checked=true;
        objects.rules.forEach(function(e){
            if(validate(listRules[e.selector.name],e.selector)){
                checked=false;
            }
        })
        if(checked){
            objects.success();
        }
    });
    let listRules={};
    objects.rules.forEach(function(e){
        if(Array.isArray(listRules[e.selector.name])){
            listRules[e.selector.name].push(e.test);
        }else{
            listRules[e.selector.name]=[e.test];
        }
        e.selector.addEventListener('blur',function(){
            validate(listRules[e.selector.name],e.selector);
        })   
    });
}
function validate(listRules,selector){
    let messageError;
    for(let i=0;i<listRules.length;i++){
        messageError=listRules[i](selector.value);
        if(messageError){
            break;
        }
    }
    if(messageError){
        selector.classList.add('red');
        selector.parentElement.querySelector('.message-error').innerText=messageError;
    }else{
        selector.classList.remove('red');
        selector.parentElement.querySelector('.message-error').innerText="";
    }
    return messageError;
}