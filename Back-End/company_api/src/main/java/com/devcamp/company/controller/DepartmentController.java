package com.devcamp.company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devcamp.company.model.Department;
import com.devcamp.company.repository.DepartmentRepository;


@RestController
@CrossOrigin
public class DepartmentController {
    
    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("/departments/")
    public ResponseEntity<Object> getAllDepartment(){
        try {
            List<Department> listAll = new ArrayList<>();
            departmentRepository.findAll().forEach(listAll::add);
            return new ResponseEntity<>(listAll,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<Object> getDepartmentById(@PathVariable("id") Long id){
        try {
            Optional<Department> departmentFound = departmentRepository.findById(id);
            if(departmentFound.isPresent()){
                return new ResponseEntity<>(departmentFound.get(),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/departments/")
    public ResponseEntity<Object> createDepartment(@RequestBody Department departmentData){
        try {
            Department newDepartment = new Department();
            newDepartment.setMaPhongBan(departmentData.getMaPhongBan());
            newDepartment.setTenPhongBan(departmentData.getTenPhongBan());
            newDepartment.setChucNang(departmentData.getChucNang());

            return new ResponseEntity<>(departmentRepository.save(newDepartment),HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<Object> updatedepartment(@RequestBody Department departmentData, @PathVariable("id") Long id){
        try {
            Optional<Department> departmentFound = departmentRepository.findById(id);
            if(departmentFound.isPresent()){
                Department updateDepartment =  departmentFound.get();
                updateDepartment.setMaPhongBan(departmentData.getMaPhongBan());
                updateDepartment.setTenPhongBan(departmentData.getTenPhongBan());
                updateDepartment.setChucNang(departmentData.getChucNang());
    

                return new ResponseEntity<>(departmentRepository.save(updateDepartment),HttpStatus.OK);
            }
            else {
                return ResponseEntity.unprocessableEntity().body("department not found");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Object> deleteDepartmentById(@PathVariable("id") Long id){
        try {
            departmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
