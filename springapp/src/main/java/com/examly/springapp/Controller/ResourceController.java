package com.examly.springapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Entity.Resource;
import com.examly.springapp.Repository.ResourceRepository;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

   
    @GetMapping
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    
    @PostMapping("/add")
    public Resource addResource(@RequestBody Resource resource) {
        return resourceRepository.save(resource);
    }

    @GetMapping("/type/{type}")
    public List<Resource> getByType(@PathVariable String type) {
        return resourceRepository.findByType(type);
    }
}
