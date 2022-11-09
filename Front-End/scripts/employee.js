"use strict";
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    const gURL_EMPLOYEE = "http://localhost:8080/employees/";
    const gURL_DEPARTMENT = "http://localhost:8080/departments/";

    const gSTT_COL = 0;
    const gCODE_COL = 1;
    const gNAME_COL = 2;
    const gDEPARTMENT_COL = 3;
    const gTITLE_COL = 4;
    const gSEX_COL = 5;
    const gWAGE_COL = 6;
    const gACTION_COL = 7;

    const gEMPLOYEE_PROPERTY = ["id","maNhanVien","tenNhanVien","departmentName","chucVu","gioiTinh","tienLuong","action"];
    
    var gEmployeeId= 0;
    var gStt = 1;
    // định nghĩa table  
    var gEmployeeTable = $("#employee-table").DataTable( {
      autoWidth:false,
      columns : [
        { data : gEMPLOYEE_PROPERTY[gSTT_COL]},
        { data : gEMPLOYEE_PROPERTY[gCODE_COL]},
        { data : gEMPLOYEE_PROPERTY[gNAME_COL]},
        { data : gEMPLOYEE_PROPERTY[gDEPARTMENT_COL]},
        { data : gEMPLOYEE_PROPERTY[gTITLE_COL]},
        { data : gEMPLOYEE_PROPERTY[gSEX_COL]},
        { data : gEMPLOYEE_PROPERTY[gWAGE_COL]},
        { data : gEMPLOYEE_PROPERTY[gACTION_COL]}
      ],
      columnDefs: [ 
      {
          targets: gSTT_COL,
          render: function(){
            return gStt++;
          }
      },
      {
          targets: gACTION_COL,
          className:"text-center",
          defaultContent: 
          `<i style='cursor:pointer' data-toggle="tooltip" data-placement="top" title="Cập nhật" class='fas fa-edit icon-detail mr-2'></i>
          <i  style='cursor:pointer' data-toggle="tooltip" data-placement="top" title="Xóa" class="fas fa-trash-alt icon-delete"></i>`
      },
      {
        targets: gSEX_COL,
        render: function(data){
          if(data == false){
            return "Nữ";
          } else {
            return "Nam";
          }
        }
      }

    ]
    });
    
    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    callApiGetAll();
    callApiGetAllDepartment();
    $('label').addClass('col-form-label font-weight-normal');
    // Tạo mới 
    $('#insert-employee').on('click', function(){
      $('#create-employee-modal').modal('show');
    });
    $('#btn-create-employee').on('click', function(){
      onBtnCreateEmployee();
    });

    // Cập nhật 
    $("#employee-table").on("click", ".icon-detail", function() {
        onIconDetailClick(this); 
    });
    $('#btn-confirm-update').on('click',function(){
        onBtnUpdateEmployee();
    });

    // Xóa 
    $("#employee-table").on("click", ".icon-delete", function() {
        $('#delete-employee-modal').modal('show');
        onIconDeleteClick(this); 
    });
    $('#btn-confirm-delete').on('click', function(){
        callApiDelete(gEmployeeId);
    })
    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */  
    // ** Xử lý CRUD ***
    // Hàm gọi API Get all
    function callApiGetAll() {
        gStt = 1
        $.ajax({
          url: gURL_EMPLOYEE,
          type: "GET",
          dataType: 'json',
          success: function(responseObject){
            console.log(responseObject);
            loadDataToTable(responseObject);
          },
          error: function(error){
            console.assert(error.responseText);
          }
        });
    }

    // Hàm gọi API Get all department
    function callApiGetAllDepartment() {
        gStt = 1
        $.ajax({
          url: gURL_DEPARTMENT,
          type: "GET",
          dataType: 'json',
          success: function(responseObject){
            loadDataSelectDepartment($('#select-department-create'),responseObject);
            loadDataSelectDepartment($('#select-department-update'),responseObject);
          },
          error: function(error){
            console.assert(error.responseText);
          }
        });
    }

    // Hàm gọi API Create
    function callApiPost(paramEmployee){
        $.ajax({
            url: gURL_EMPLOYEE + "?departmentId="+ paramEmployee.departmentId ,
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify(paramEmployee),
            success: function(){
              alertToast("success", "Tạo mới thành công!")
              callApiGetAll();
              $('#create-employee-modal').modal('hide');
            },
            error: function(){
              alert('Tạo mới thất bại');
            }
          })
    }

    // Hàm gọi API Update 
    function callApiUpdate(paramObj){
      $.ajax({
        url:gURL_EMPLOYEE +paramObj.id+"?departmentId="+paramObj.departmentId,
        type:"PUT",
        contentType:"application/json",
        data: JSON.stringify(paramObj),
        success: function(paramRes){
          $('#detail-employee-modal').modal('hide');
          alertToast("success",`Cập nhật thành công`);
          callApiGetAll();
        },
        error: function(){
          alert('Cập nhật thất bại!')
        }
      })
    }

    // Hàm gọi API DELETE
    function callApiDelete(paramId){
        $.ajax({
            url: gURL_EMPLOYEE + paramId,
            type:"DELETE",
            success: function(){
                $('#delete-employee-modal').modal('hide');
                alertToast('error','Đã xóa nhân viên');
                callApiGetAll();
            },
            error: function(){
              console.log('fail');
            }
        })
    }

    // ** Xử lý Sự kiện ***
    // Hàm xử lý nút thêm hàng
    function onBtnCreateEmployee(){
        //B1: Thu thập dữ liệu
        var vEmployeeRequest = {
          maNhanVien:$('#inp-code-create').val().trim(),
          tenNhanVien: $('#inp-name-create').val().trim(),
          chucVu: $('#select-title-create').val().trim(),
          gioiTinh: $('#select-sex-create').val().trim(),
          tienLuong: $('#inp-wage-create').val().trim(),
          departmentId: $('#select-department-create').val().trim(),
        };
        //B2: Kiểm tra thông tin
        var vCheck = validateData(vEmployeeRequest);
        if(vCheck == true){
            //B3: goi API để tạo Employee mới
            callApiPost(vEmployeeRequest);
        }
    }
    // Hàm xử lý nút update 
    function onIconDetailClick(paramElemet) {
        var vRowSelected = $(paramElemet).parents('tr');
        var vDatatableRow = gEmployeeTable.row(vRowSelected); 
        var vEmployeeData = vDatatableRow.data();
        // Hiện modal chi tiết đơn hàng
        console.log(vEmployeeData);
        gEmployeeId = vEmployeeData.id;
        $('#detail-employee-modal').modal('show');
        $('#inp-code-update').val(vEmployeeData.maNhanVien);
        $('#inp-name-update').val(vEmployeeData.tenNhanVien);
        $('#select-title-update').val(vEmployeeData.chucVu.toLowerCase());
        $('#select-sex-update').val(`${vEmployeeData.gioiTinh}`);
        $('#inp-wage-update').val(vEmployeeData.tienLuong);
        $('#select-department-update').val(vEmployeeData.departmentId);
    }

    // Hàm xử lý nút xác nhận cập nhật 
    function onBtnUpdateEmployee(){
        var vEmployeeRequest ={
          id: gEmployeeId,
          maNhanVien: $('#inp-code-update').val().trim(),
          tenNhanVien: $('#inp-name-update').val().trim(),
          chucVu: $('#select-title-update').val().trim(),
          gioiTinh:$('#select-sex-update').val().trim(),
          tienLuong: $('#inp-wage-update').val().trim(),
          departmentId: $('#select-department-update').val().trim()
        }
        if(validateData(vEmployeeRequest) == true){
          callApiUpdate(vEmployeeRequest);
          console.log(vEmployeeRequest);
        }
      }
  
    // Hàm xử lý nút delete
    function onIconDeleteClick(paramElemet) {
        var vRowSelected = $(paramElemet).parents('tr');
        var vDatatableRow = gEmployeeTable.row(vRowSelected); 
        var vEmployeeData = vDatatableRow.data();
        gEmployeeId = vEmployeeData.id;
        $('#delete-employee-modal').modal('show');
    }
    

    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình */
    // load data to table
    function loadDataToTable(paramResponseObject) {
      //Xóa toàn bộ dữ liệu đang có của bảng
      gEmployeeTable.clear();
      //Cập nhật data cho bảng 
      gEmployeeTable.rows.add(paramResponseObject);
      //Cập nhật lại giao diện hiển thị bảng
      gEmployeeTable.draw();
    }


    // Hàm kiểm tra thông tin Employee tạo mới
    function validateData(paramEmployee){
        if(paramEmployee.maNhanVien == ""){
            alert('Hãy điền mã nhân viên');
            return false;
        }
        if(paramEmployee.tenNhanVien == ""){
            alert('Hãy điền họ tên nhân viên');
            return false;
        }
        if(paramEmployee.chucVu == "0"){
            alert('Hãy chọn chức vụ!');
            return false;
        }
        if(paramEmployee.tienLuong < 0){
          alert('Tiền lương không thể nhỏ hơn 0');
          return false;
        }
        if(paramEmployee.departmentId == 0){
          alert('Hãy chọn phòng ban!');
          return false;
        }
        return true;
    }

    // Hàm load thông tin select department
    function loadDataSelectDepartment(paramElemet, dList){
      var vSelect = $(paramElemet);
      console.log(dList);
      for (var i = 0; i< dList.length; i++ ){
        $('<option>').html(dList[i].tenPhongBan)
                      .val(dList[i].id).appendTo(vSelect);
      }
    }


    // Hàm tạo thông báo toast
    function alertToast(paramIcon, paramTittle){
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });                
        Toast.fire({
            icon: paramIcon,
            title: paramTittle
        });
    }

