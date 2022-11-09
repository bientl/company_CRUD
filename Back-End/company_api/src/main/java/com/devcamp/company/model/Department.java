package com.devcamp.company.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ma_phong_ban", nullable = false)
    private String maPhongBan;

    @Column(name = "ten_phong_ban", nullable = false)
    private String tenPhongBan;

    @Column(name = "chuc_nang", nullable = false)
    private String ChucNang;

    @OneToMany(targetEntity = Employee.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "department_id")
    @JsonManagedReference
    private List<Employee> employees;

    public Department() {
    }

    public Department(long id, String maPhongBan, String tenPhongBan, String chucNang, List<Employee> employesses) {
        this.id = id;
        this.maPhongBan = maPhongBan;
        this.tenPhongBan = tenPhongBan;
        ChucNang = chucNang;
        this.employees = employesses;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMaPhongBan() {
        return maPhongBan;
    }

    public void setMaPhongBan(String maPhongBan) {
        this.maPhongBan = maPhongBan;
    }

    public String getTenPhongBan() {
        return tenPhongBan;
    }

    public void setTenPhongBan(String tenPhongBan) {
        this.tenPhongBan = tenPhongBan;
    }

    public String getChucNang() {
        return ChucNang;
    }

    public void setChucNang(String chucNang) {
        ChucNang = chucNang;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    
    

    
    

}
