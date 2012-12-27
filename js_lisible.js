
<script type="text/javascript">

(function() {
	 var divs = document.getElementById('ss-form').
	 getElementsByTagName('div');
	 var numDivs = divs.length;
	 
	 for (var j = 0; j < numDivs; j++) {
		if (divs[j].className == ' -bad') {
			divs[j].lastChild.firstChild.lastChild.focus();
			return;
		}
	 }
	 
	 for (var i = 0; i < numDivs; i++) {
		var div = divs[i];
		if (div.className == 'ss-form-entry' &&
				div.firstChild &&
				div.firstChild.className == 'ss-q-title') {
			div.lastChild.focus;
			return;
		}
	 }
})();

(function() { // On utilise une IEF pour ne pas polluer l'espace global
    
    // Fonction de désactivation de l'affichage des « tooltips »
    
    function deactivateTooltips() {
    
        var spans = document.getElementsByTagName('span'),
        spansLength = spans.length;
        
        for (var i = 0 ; i < spansLength ; i++) {
            if (spans[i].className == 'tooltip') {
                spans[i].style.display = 'none';
            }
        }
    
    }
    
    
    // La fonction ci-dessous permet de récupérer la « tooltip » qui correspond à notre input
    
    function getTooltip(element) {
    
        while (element = element.nextSibling) {
            if (element.className === 'tooltip') {
                return element;
            }
        }
        
        return false;
    
    }
    
    function clean (myString) {//supprime les espaces en début et fin de chaine et les caractères non autorises
		return myString.replace(/^\s+/g,'')
						.replace(/\s+$/g,'')
				        .replace(/</g, "")
				        .replace(/>/g, "")
				        .replace(/"/g, "");
	} 
	// Fonctions de vérification du formulaire, elles renvoient « true » si tout est OK

	
    
    var check = {}; // On met toutes nos fonctions dans un objet littéral
    var check_benevole={};
        
    check['lastName'] = function(input_select) {
        var name = input_select.value,
            tooltipStyle = getTooltip(input_select).style;
    
        if (name.length >= 2) {
            name.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            name.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    
    };
    
    check['firstName'] = check['lastName']; // La fonction pour le prénom est la même que celle du nom
    
    check['num_port']= function(input_select) {
    
        var num_port = input_select.value,
            tooltipStyle = getTooltip(input_select).style;
        num_port=num_port.replace(/[^0-9]/g,"");
        input_select.value=num_port;
        if(num_port.length==10){
        	tooltipStyle.display = 'none';
            return true;
        } else {
            tooltipStyle.display = 'inline-block';
            return false;
        }    
    };

    check['mail']= function(input_select) {    
        var mail = input_select.value,
            tooltipStyle = getTooltip(input_select).style;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(filter.test(mail)){
        	tooltipStyle.display = 'none';
            return true;
        } else {
            tooltipStyle.display = 'inline-block';
            return false;
        }    
    };

    check['cp']= function(input_select) {    
        var cp = input_select.value,
            tooltipStyle = getTooltip(input_select).style;
        var filter = /^[0-9]{5}$/;
        if(filter.test(cp)){
        	tooltipStyle.display = 'none';
            return true;
        } else {
            tooltipStyle.display = 'inline-block';
            return false;
        }    
    };

    check['date_naiss']= function(input_select) {    
        var date_naiss = input_select.value,
            tooltipStyle = getTooltip(input_select).style;
        var filter = /^[1-9][0-9]{7}$/;
        if(filter.test(date_naiss)){
        	tooltipStyle.display = 'none';
            return true;
        } else {
            tooltipStyle.display = 'inline-block';
            return false;
        }    
    };

    function click_radio(id){
    	radio=document.getElementById(id);
    	tooltipStyle = document.getElementById("tooltip_"+id.replace(/_[0-9]/,"")).style;
		radio.className = 'correct';
        tooltipStyle.display = 'none';
        if(id=="benevole_1"){
        	document.getElementById('partie_benevole').style.display="inline-block";
        }
        if(id=="benevole_2"){
        	document.getElementById('partie_benevole').style.display="none";
        }
    }


    //partie benevole
    check_benevole['lastNameContact'] = check['lastName'];
    check_benevole['mailContact'] = check['mail'];

    function check_radio(id,nb){
    	checked=false;
    	i=1;
    	while(i<=nb && !checked){
    		checked=document.getElementById(id+'_'+i).checked;
    		i++;
    	}    	
    	radio=document.getElementById(id+'_1');
    	if(!checked){
    		tooltipStyle = document.getElementById('tooltip_'+id).style;
			radio.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
    	}
    	tooltipStyle = document.getElementById('tooltip_'+id).style;
		radio.className = 'correct';
        tooltipStyle.display = 'none';
        return true;
    }

    function check_all_benevole(){
    	var result=true;
    	if(document.getElementById('benevole_1').checked){
    		for (var i in check_benevole) {
                result = check_benevole[i](document.getElementById(i)) && result;
            }
            result= check_radio('chefEquipe',2) && result;
            result= check_radio('souhait',3) && result;
    	}
    	return result;
    }
     
    // Mise en place des événements
    
    (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
    
        var myForm = document.getElementById('ss-form'),
            inputs = document.getElementsByTagName('input'),
            inputsLength = inputs.length;
    	if(document.getElementById('benevole_1').checked){
    		document.getElementById('partie_benevole').style.display="inline-block";
    	}

        for (var i = 0 ; i < inputsLength ; i++) {
            if (inputs[i].type == 'text' || inputs[i].type == 'password') {
    
                inputs[i].onchange = function() { 
                	this.value=clean(this.value);
                	if(check[this.id]){
                		check[this.id](this);// « this » représente l'input actuellement modifié
                	}
                	else{
                		check_benevole[this.id](this);
                	}
                     
                };
    
            }
            else if(inputs[i].type == 'radio'){
            	inputs[i].onclick = function() { 
                    click_radio(this.id); 
                };
            }
        }
    
        myForm.onsubmit = function() {
            var result = true;
    		
            for (var i in check) {
                result = check[i](document.getElementById(i)) && result;
            }
            result= check_radio('tractage',2) && result;
            result= check_radio('benevole',2) && result;
            result= check_all_benevole() && result;
    
            if (!result) {
                alert("Le formulaire n'est pas valide\nVeuillez vérifier votre saisie");
            }    
            else{
            	result=$('ul').validate();
				if(!result){alert('Veuillez mettre les chiffres dans le bon ordre');}
            }	
            return result;
    
        };
    
        myForm.onreset = function() {
    
            for (var i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type == 'text' || inputs[i].type == 'password') {
                    inputs[i].className = '';
                }
            }
    
            deactivateTooltips();
    
        };
    
    })();
    
    
    // Maintenant que tout est initialisé, on peut désactiver les « tooltips »
    
    deactivateTooltips();

})();


</script>
<script type="text/javascript" src="part_js_minifie.js"/></script>
 <script type="text/javascript">
            (
            function($){

                $.fn.shuffle = function() {
                    return this.each(function(){
                        var items = $(this).children();

                        return (items.length)
                            ? $(this).html($.shuffle(items,$(this)))
                        : this;
                    });
                }

                $.fn.validate = function() {
                    var res = false;
                    this.each(function(){
                        var arr = $(this).children();
                        res =    ((arr[0].innerHTML=="1")&&
                            (arr[1].innerHTML=="2")&&
                            (arr[2].innerHTML=="3")&&
                            (arr[3].innerHTML=="4")&&
                            (arr[4].innerHTML=="5")&&
                            (arr[5].innerHTML=="6"));
                    });
                    if(res){
                    	$('#ss-form').attr("action","https://docs.google.com/spreadsheet/formResponse?formkey=dGFmRUIwSFhleUVLcU5Fd3I3Qm1KX3c6MA&theme=0AX42CRMsmRFbUy04NmYzYTk2OC1hYzhjLTQ1NTAtOTRiNS0zZWI4YWM2MmI4Njk&ifq");
                    }
                    return res;
                }

                $.shuffle = function(arr,obj) {
                    for(
                    var j, x, i = arr.length; i;
                    j = parseInt(Math.random() * i),
                    x = arr[--i], arr[i] = arr[j], arr[j] = x
                );
                    if(arr[0].innerHTML=="1") obj.html($.shuffle(arr,obj))
                    else return arr;
                }

            })(jQuery);

            $(function() {
                $("#sortable").sortable();
                $("#sortable").disableSelection();
                $('ul').shuffle();
            });
        </script>
