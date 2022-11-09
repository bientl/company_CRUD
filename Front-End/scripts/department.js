"use strict";
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    const gURL_DEPARTMENT = "http://localhost:8080/departments/";

    const gSTT_COL = 0;
    const gCODE_COL = 1;
    const gNAME_COL = 2;
    const gFUNCTION_COL = 3;
    const gEMPLOYEE_NUM_COL = 4;
    const gWAGE_TOTAL_COL = 5;
    const gACTION_COL = 6;

    const gDEPARTMENT_PROPERTY = ["id","maPhongBan","tenPhongBan","chucNang","employees","employees","action"];
    
    var gDepartmentId= 0;
    var gStt = 1;
    // định nghĩa table  
    var gDepartmentTable = $("#department-table").DataTable( {
      autoWidth:false,
      columns : [
        { data : gDEPARTMENT_PROPERTY[gSTT_COL]},
        { data : gDEPARTMENT_PROPERTY[gCODE_COL]},
        { data : gDEPARTMENT_PROPERTY[gNAME_COL]},
        { data : gDEPARTMENT_PROPERTY[gFUNCTION_COL]},
        { data : gDEPARTMENT_PROPERTY[gEMPLOYEE_NUM_COL]},
        { data : gDEPARTMENT_PROPERTY[gWAGE_TOTAL_COL]},
        { data : gDEPARTMENT_PROPERTY[gACTION_COL]}
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
        targets: gEMPLOYEE_NUM_COL,
        render: function(data){
          return data.length;
        }
      },
      {
        targets: gWAGE_TOTAL_COL,
        render: function(data){
          var vTotalWage = 0;
          for(var i = 0 ; i <data.length; i++){
            vTotalWage += data[i].tienLuong;
          }
          return vTotalWage;
        }
      }

    ]
    });
    
    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    callApiGetAll();
    $('label').addClass('col-form-label font-weight-normal');
    // Tạo mới 
    $('#insert-department').on('click', function(){
      $('#create-department-modal').modal('show');
    });
    $('#btn-create-department').on('click', function(){
      onBtnCreateDepartment();
    });

    // Cập nhật 
    $("#department-table").on("click", ".icon-detail", function() {
        onIconDetailClick(this); 
    });
    $('#btn-confirm-update').on('click',function(){
        onBtnUpdateDepartment();
    });

    // Xóa 
    $("#department-table").on("click", ".icon-delete", function() {
        $('#delete-department-modal').modal('show');
        onIconDeleteClick(this); 
    });
    $('#btn-confirm-delete').on('click', function(){
        callApiDelete(gDepartmentId);
    })
    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */  
    // ** Xử lý CRUD ***
    // Hàm gọi API Get all
    function callApiGetAll() {
        gStt = 1
        $.ajax({
          url: gURL_DEPARTMENT,
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

    // Hàm gọi API Create
    function callApiPost(paramDepartment){
        $.ajax({
            url: gURL_DEPARTMENT,
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify(paramDepartment),
            success: function(paramRes){
              alertToast("success", "Tạo mới thành công!")
              callApiGetAll();
              $('#create-department-modal').modal('hide');
            },
            error: function(){
              alert('Tạo mới thất bại');
            }
          })
    }

    // Hàm gọi API Update 
    function callApiUpdate(paramObj){
      $.ajax({
        url:gURL_DEPARTMENT +paramObj.id,
        type:"PUT",
        contentType:"application/json",
        data: JSON.stringify(paramObj),
        success: function(paramRes){
          $('#detail-department-modal').modal('hide');
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
            url: gURL_DEPARTMENT + paramId,
            type:"DELETE",
            success: function(){
                $('#delete-department-modal').modal('hide');
                alertToast('error','Đã xóa phòng ban');
                callApiGetAll();
            },
            error: function(){
              console.log('fail');
            }
        })
    }

    // ** Xử lý Sự kiện ***
    // Hàm xử lý nút thêm hàng
    function onBtnCreateDepartment(){
        //B1: Thu thập dữ liệu
        var vDepartmentRequest = {
          maPhongBan:$('#inp-code-create').val().trim(),
          tenPhongBan: $('#inp-name-create').val().trim(),
          chucNang: $('#inp-function-create').val().trim()
        };
        //B2: Kiểm tra thông tin
        var vCheck = validateData(vDepartmentRequest);
        if(vCheck == true){
            //B3: goi API để tạo Department mới
            callApiPost(vDepartmentRequest);
        }
    }
    // Hàm xử lý nút update 
    function onIconDetailClick(paramElemet) {
        var vRowSelected = $(paramElemet).parents('tr');
        var vDatatableRow = gDepartmentTable.row(vRowSelected); 
        var vDepartmentData = vDatatableRow.data();
        // Hiện modal chi tiết đơn hàng
        gDepartmentId = vDepartmentData.id;
        $('#detail-department-modal').modal('show');
        $('#inp-code-update').val(vDepartmentData.maPhongBan);
        $('#inp-name-update').val(vDepartmentData.tenPhongBan);
        $('#inp-function-update').val(vDepartmentData.chucNang);
    }

    // Hàm xử lý nút xác nhận cập nhật 
    function onBtnUpdateDepartment(paramObj){
        var vDepartmentRequest ={
          id: gDepartmentId,
          maPhongBan:$('#inp-code-update').val().trim(),
          tenPhongBan: $('#inp-name-update').val().trim(),
          chucNang: $('#inp-function-update').val().trim()
        }
        if(validateData(vDepartmentRequest) == true){
          callApiUpdate(vDepartmentRequest);
        }
      }
  
    // Hàm xử lý nút delete
    function onIconDeleteClick(paramElemet) {
        var vRowSelected = $(paramElemet).parents('tr');
        var vDatatableRow = gDepartmentTable.row(vRowSelected); 
        var vDepartmentData = vDatatableRow.data();
        gDepartmentId = vDepartmentData.id;
        $('#delete-department-modal').modal('show');
    }
    


    


    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình */
    // load data to table
    function loadDataToTable(paramResponseObject) {
      //Xóa toàn bộ dữ liệu đang có của bảng
      gDepartmentTable.clear();
      //Cập nhật data cho bảng 
      gDepartmentTable.rows.add(paramResponseObject);
      //Cập nhật lại giao diện hiển thị bảng
      gDepartmentTable.draw();
    }


    // Hàm kiểm tra thông tin Department tạo mới
    function validateData(paramDepartment){
        if(paramDepartment.maPhongBan == ""){
            alert('Mã phòng ban không được để trống!');
            return false;
        }
        if(paramDepartment.tenPhongBan == ""){
            alert('Tên phòng ban không được để trống!');
            return false;
        }
        if(paramDepartment.chucNang == ""){
            alert('Chức năng không được để trống!');
            return false;
        }
        return true;
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

