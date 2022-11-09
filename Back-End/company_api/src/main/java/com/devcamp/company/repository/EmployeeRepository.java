package com.devcamp.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.company.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
}
