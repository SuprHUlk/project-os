package com.backend.os.service;

import com.backend.os.model.FirebaseTokenModel;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseService {
    @PostConstruct
    public void FirebaseInit() throws IOException, FirebaseAuthException {

        FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
    }

    public ResponseEntity<String> verifyToken(FirebaseTokenModel token) {

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token.getIdToken());
            return ResponseEntity.ok("{\"isValid\": \"true\"}");
        }
        catch(FirebaseAuthException e) {
            return ResponseEntity.ok("{\"isValid\": \"false\"}");
        }

    }
}
