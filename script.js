const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];
addBtn.addEventListener('click',()=>{
    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category=categorySelect.value;

    if(name==='' || isNaN(amount) || amount<=0){
        alert("Please enter valid expense details!");
        return;
    }

    const expense={
        id:Date.now(),
        name,
        amount,
        category
    };

    expenses.push(expense);
    renderExpenses();
    updateTotal();
    saveToLocalStorage();

    nameInput.value='';
    amountInput.value='';
})

function renderExpenses(){
    expenseList.innerHTML='';
    expenses.forEach(exp=>{
        const li=document.createElement('li');
        li.innerHTML= `${exp.name} - &#8377;${exp.amount} (${exp.category} )
        <button class="delete-btn" data-id="${exp.id}">X</button>`;
        expenseList.appendChild(li);
    });
}

expenseList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete-btn')){
        const id=Number(e.target.getAttribute('data-id'));
        expenses=expenses.filter(exp=>exp.id !==id);
        renderExpenses();
        updateTotal();
        saveToLocalStorage();
    }
});

function updateTotal(){
    const total=expenses.reduce((sum,exp)=>sum + exp.amount, 0);
    totalAmount.textContent= `${total}`;
}

function saveToLocalStorage(){
    localStorage.setItem('expenses',JSON.stringify(expenses));
}
function loadFromLocalStorage(){
    const data = localStorage.getItem("expenses");
    if(data){
        expenses=JSON.parse(data);
        renderExpenses();
        updateTotal();
    }
}

window.addEventListener('load',loadFromLocalStorage);
