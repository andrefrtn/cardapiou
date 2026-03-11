package com.example.invit_in.controller;

import com.example.invit_in.food.Food;
import com.example.invit_in.food.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("food")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodRepository repository;

    @GetMapping
    public List<Food> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return repository.save(food);
    }

    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody Food food) {
        food.setId(id);
        return repository.save(food);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
