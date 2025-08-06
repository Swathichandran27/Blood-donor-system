package com.examly.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.examly.springapp.Entity.Resource;

public interface ResourceRepository extends JpaRepository<Resource,Long>{
     List<Resource> findByType(String type);
}
