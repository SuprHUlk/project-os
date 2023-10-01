package com.backend.os.controller;

import com.backend.os.model.FirebaseTokenModel;
import com.backend.os.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class FirebaseController {

    @Autowired
    FirebaseService firebaseService;

    @PostMapping({"/verifyFirebaseToken"})
    public ResponseEntity<String> verifyFirebaseToken(@RequestBody FirebaseTokenModel token) {
        return firebaseService.verifyToken(token);
    }
}
