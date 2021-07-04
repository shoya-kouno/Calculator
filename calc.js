class Calculation{

    constructor(){

        this.ans_data = 0;
        this.done_flag = false;
        this.safe_flag = null;
        this.exce_flag = false;
        this.str = [];
        this.formule = [];
        this.count = 0;

    }

    set(n){

        console.log("set : " + n);

        var obj = document.getElementById("results");

        this.str[this.count] = n;
        this.formule[this.count] = n;

        this.count++;

        this.drow();
    }

    math_func(n){

        var obj = document.getElementById("results");
        var flag = document.getElementById("deg");

        if(n == "log10("){
            this.str[this.count] = "log("
        }else if(n == "log("){
            this.str[this.count] = "ln("
        }else{
            this.str[this.count] = n;
        }

        

        if(flag.checked && (n == "asin(" || n == "acos(" || n == "atan(")){
            n = "PI**(-1)*180*Math." + n;
        }

        if(flag.checked && (n == "sin(" || n == "cos(" || n == "tan(")){
            n = n + "Math.PI/180*";
        }

        this.formule[this.count] = "Math." + n;

        

        console.log("set : " + this.formule[this.count]);

        this.count++;

        this.drow();

    }

    drow(){

        var obj = document.getElementById("results");

        obj.value = "";

        if(this.count > 0){
            console.log("Drow");           
            
            for(let i = 0; i < this.count; i++){
                obj.value += this.str[i];
            }
        }     
    }

    del(){

        if(this.count > 0){

            console.log("Delete : " + this.formule[this.count - 1]);
            this.formule.pop();
            this.str.pop();

            this.count--;

            this.drow();

        }
    }

    clear(){
        console.log("ALL Delete");
        this.formule = [];
        this.str = [];
        this.count = 0;

        this.drow();

    }

    fao(n){
        var obj = document.getElementById("results");

        this.str[this.count] = n;

        switch(n){
            case '+':
                n = '+';
                break;
            
            case '-':
                n = '-';
                break;
            
            case '×':
                n = '*';
                break;

            case '÷':
                n = '/';
                break;
            
            case '^':
                n = '**';
                break;

            case 'π':
                n = 'Math.PI';
                break;

            default:
                break;
        }

        this.formule[this.count] = n;
        console.log("set : " + this.formule[this.count]);
        this.count++;

        this.drow();
    }

    calculate(){

        var execution_formula = "";
        var Ans = this.ans_data;
        var obj = document.getElementById("results");
        var obj_ans = document.getElementById("ans_s");

        for(let i = 0; i < this.count; i++){
            execution_formula += this.formule[i];
        }

        this.clear();

        this.safe_flag = execution_formula.match(/[^0-9\+\-\*\/~\(\)\{\}\.\Ans\log\Math\PI\Math.sin\Math.cos\Math.tan\Math.asin\Math.acos\Math.atan\exp\log10]/g);

        try{

            if(this.safe_flag == null){
                this.ans_data = eval(execution_formula);
                obj.value = this.ans_data;
                console.log("calculated, Ans : " + this.ans_data);
                obj_ans.innerHTML = "<p> Ans = " + this.ans_data + "</p>";
            }else{
                throw new Error("not null");
            }

        }catch(e){
            obj.value = "syntax error";
            console.error(e.message);
        }        
        
    }
    
}

