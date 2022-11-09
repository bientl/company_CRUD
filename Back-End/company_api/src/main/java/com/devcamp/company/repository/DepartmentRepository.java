package com.devcamp.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.company.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
}
