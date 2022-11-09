package com.devcamp.company.model;


import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ma_nhan_vien", nullable = false)
    private String maNhanVien;

    @Column(name = "ten_nhan_vien", nullable = false)
    private String tenNhanVien;

    @Column(name = "chuc_vu", nullable = false)
    private String chucVu;

    @Column(name = "gioi_tinh", nullable = false)
    private boolean gioiTinh;

    @Column(name = "tien_luong", nullable = false)
    private Long tienLuong;

    @ManyToOne
    @JsonBackReference
    private Department department;

    public Employee() {
    }

    public Employee(long id, String maNhanVien, String tenNhanVien, String chucVu, boolean gioiTinh, Long tienLuong,
            Department department) {
        this.id = id;
        this.maNhanVien = maNhanVien;
        this.tenNhanVien = tenNhanVien;
        this.chucVu = chucVu;
        this.gioiTinh = gioiTinh;
        this.tienLuong = tienLuong;
        this.department = department;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(String maNhanVien) {
        this.maNhanVien = maNhanVien;
    }

    public String getTenNhanVien() {
        return tenNhanVien;
    }

    public void setTenNhanVien(String tenNhanVien) {
        this.tenNhanVien = tenNhanVien;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public boolean isGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public Long getTienLuong() {
        return tienLuong;
    }

    public void setTienLuong(Long tienLuong) {
        this.tienLuong = tienLuong;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getDepartmentName() {
        return department.getTenPhongBan();
    }
   
    public Long getDepartmentId() {
        return department.getId();
    }
}
