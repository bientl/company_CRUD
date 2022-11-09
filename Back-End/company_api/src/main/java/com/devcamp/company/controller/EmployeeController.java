package com.devcamp.company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devcamp.company.model.Department;
import com.devcamp.company.model.Employee;
import com.devcamp.company.repository.DepartmentRepository;
import com.devcamp.company.repository.EmployeeRepository;

@RestController
@CrossOrigin
public class EmployeeController {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("/employees/")
    public ResponseEntity<Object> getAllEmployees(){
        try {
            List<Employee> listAll = new ArrayList<>();
            employeeRepository.findAll().forEach(listAll::add);
            return new ResponseEntity<>(listAll,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Object> getEmployeeById(@PathVariable("id") Long id){
        try {
            Optional<Employee> employeeFound = employeeRepository.findById(id);
            if(employeeFound.isPresent()){
                return new ResponseEntity<>(employeeFound.get(),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/employees/")
    public ResponseEntity<Object> createemployee(@RequestBody Employee employeeData, @RequestParam(name="departmentId") Long id){
        try {
            Optional<Department> departmentFound = departmentRepository.findById(id);
            //Check xem có employee nào với id trên
            if(departmentFound.isPresent()){
                Employee newEmployee = new Employee();
                newEmployee.setMaNhanVien(employeeData.getMaNhanVien());
                newEmployee.setTenNhanVien(employeeData.getTenNhanVien());
                newEmployee.setChucVu(employeeData.getChucVu());
                newEmployee.setGioiTinh(employeeData.isGioiTinh());
                newEmployee.setTienLuong(employeeData.getTienLuong());

                newEmployee.setDepartment(departmentFound.get());
                return new ResponseEntity<>(employeeRepository.save(newEmployee),HttpStatus.OK);
            }
            else {
                return ResponseEntity.unprocessableEntity().body("department not found");
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Object> updateemployee(@RequestBody Employee employeeData, @PathVariable("id") Long id,
    @RequestParam(name="departmentId") Long departmentId){
        try {
            Optional<Employee> employeeFound = employeeRepository.findById(id);
            Optional<Department> departmentFound = departmentRepository.findById(departmentId);
            if(employeeFound.isPresent()){
                Employee updateEmployee=  employeeFound.get();
                updateEmployee.setMaNhanVien(employeeData.getMaNhanVien());
                updateEmployee.setTenNhanVien(employeeData.getTenNhanVien());
                updateEmployee.setChucVu(employeeData.getChucVu());
                updateEmployee.setGioiTinh(employeeData.isGioiTinh());
                updateEmployee.setTienLuong(employeeData.getTienLuong());
                updateEmployee.setDepartment(departmentFound.get());

                return new ResponseEntity<>(employeeRepository.save(updateEmployee),HttpStatus.OK);
            }
            else {
                return ResponseEntity.unprocessableEntity().body("employee not found");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Object> deleteEmployeeById(@PathVariable("id") Long id){
        try {
            employeeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
