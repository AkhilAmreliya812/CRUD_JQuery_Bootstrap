const saveOrderBtn = document.getElementById("saveOrder");

function resetOrder() {
	document.getElementById("orderManagement").reset();
	
	saveOrderBtn.innerHTML = "Save";
	saveOrderBtn.onclick = addOrder;
	
	clearValidationError();
}

//
function validateField(eleId, errId, fieldName) {
	let orderData = document.getElementById(eleId).value.trim();

	if(orderData == "") {
		document.getElementById(errId).innerHTML = "*" +fieldName +" Is Required";
		document.getElementById(eleId).style.border = "2px solid red";
	}
	else{
		document.getElementById(errId).innerHTML = "";
		document.getElementById(eleId).style.border = "1px solid gray";
	}
}

function validationError(){
	document.getElementById("idError").innerHTML = "*Order Id Is Required";
	document.getElementById("dateError").innerHTML = "*Order Date Is Required";
	document.getElementById("statusError").innerHTML = "*Order Status Is Required";
	document.getElementById("desError").innerHTML = "*Order Description Is Required";
	
	document.getElementById("orderId").style.border  = "2px solid red"; 
	document.getElementById("orderDate").style.border  = "2px solid red"; 
	document.getElementById("orderStatus").style.border  = "2px solid red"; 
	document.getElementById("orderDes").style.border  = "2px solid red"; 
}

function clearValidationError() {
	document.getElementById("idError").innerHTML = "";
	document.getElementById("dateError").innerHTML = "";
	document.getElementById("statusError").innerHTML = "";
	document.getElementById("desError").innerHTML = "";	
	
	document.getElementById("orderId").style.border  ="1px solid gray"; 
	document.getElementById("orderDate").style.border  ="1px solid gray"; 
	document.getElementById("orderStatus").style.border  ="1px solid gray"; 
	document.getElementById("orderDes").style.border  ="1px solid gray"; 
}

function showErrorMsg(orderDetails,errorEleId,filedName,eleId){
	if(orderDetails == ""){
		document.getElementById(errorEleId).innerHTML = "*" + filedName +" Is Required"
		document.getElementById(eleId).style.border = "2px solid red";
	} else {
		document.getElementById(errorEleId).innerHTML = "";
	}
}

function addOrder(){

	let orderId = document.getElementById("orderId").value.trim();
	let orderDate = document.getElementById("orderDate").value.trim();
	let orderStatus = document.getElementById("orderStatus").value.trim();
	let orderDes = document.getElementById("orderDes").value.trim();

	if((orderId == "") && (orderDate == "" ) && (orderStatus == "") && (orderDes == "")){
		validationError();
	}else{
		showErrorMsg(orderId,"idError","Order Id","orderId");
		showErrorMsg(orderDate,"dateError","Order Date","orderDate");
		showErrorMsg(orderStatus,"statusError","Order Status","orderStatus");
		showErrorMsg(orderDes,"desError","Order Description","orderDes");
	}
	if((orderId != "") && (orderDate != "") && (orderStatus != "") && (orderDes != "")){
		clearValidationError();
		
		let orderTable = document.getElementById("orderTable");
		
		let addrow = orderTable.insertRow();
		
		orderId = addrow.insertCell();
		orderDate = addrow.insertCell();
		orderStatus = addrow.insertCell();
		orderDes = addrow.insertCell();
		EditDelete = addrow.insertCell();
		
		orderId.innerHTML = document.getElementById("orderId").value;
		orderDate.innerHTML = document.getElementById("orderDate").value;
		orderStatus.innerHTML = document.getElementById("orderStatus").value;
		orderDes.innerHTML = document.getElementById("orderDes").value;
			
		EditDelete.innerHTML = `<button type='button' name='update' 
								onclick='editOrder(this);' id='editOrder'>Edit</button>
							
								<button type='button' name='delete'
								onclick="deleteOrder(this);" id="deleteOrder"></i>Delete</button>`;
		resetOrder();
	}	
}
let row;
function editOrder(childElement) {	
	saveOrderBtn.innerText = "Update";
	saveOrderBtn.onclick = updateOrder;
	
	row = childElement.parentElement.parentElement;
	
	document.getElementById("orderId").value = row.cells[0].innerHTML;
	document.getElementById("orderDate").value = row.cells[1].innerHTML;
	document.getElementById("orderStatus").value = row.cells[2].innerHTML;
	document.getElementById("orderDes").value = row.cells[3].innerHTML;	
	
	clearValidationError();
}

function updateOrder() {	
	let orderId = document.getElementById("orderId").value.trim();
	let orderDate = document.getElementById("orderDate").value.trim();
	let orderStatus = document.getElementById("orderStatus").value.trim();
	let orderDes = document.getElementById("orderDes").value.trim();
	
	if((orderId == "") && (orderDate == "") && (orderStatus == "") && (orderDes == "")){
		validationError();
	} else {
		showErrorMsg(orderId,"idError","Order Id","orderId");
		showErrorMsg(orderDate,"dateError","Order Date","orderDate");
		showErrorMsg(orderStatus,"statusError","Order Status","orderStatus");
		showErrorMsg(orderDes,"desError","Order Description","orderDes");
	}
	if((orderId != "") && (orderDate != "") && (orderStatus != "") && (orderDes != "")){
		clearValidationError();
		
	row.cells[0].innerHTML = orderId;
	row.cells[1].innerHTML = orderDate;
	row.cells[2].innerHTML = orderStatus;
	row.cells[3].innerHTML = orderDes;
			
		EditDelete.innerHTML = `<button type='button' name='update' 
								onclick='editOrder(this);' id='editOrder'>Edit</button>
							
								<button type='button' name='delete'
								onclick="deleteOrder(this);" id="deleteOrder">Delete</button>`;
		resetOrder();
	}	
}
function deleteOrder(childElement) {
	//Find want to delete row
	let selectedRow = childElement.parentElement.parentElement;	
	if(confirm("You want to delete data ?")){
		selectedRow.remove();	
		if(selectedRow === row) {
			resetOrder();
		}
	}	
}
