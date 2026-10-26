package com.filedrop.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UploadController {

    private final Path uploadDir = Paths.get("uploads");

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file provided"));
        }

        Files.createDirectories(uploadDir);

        String original = file.getOriginalFilename() == null ? "file" : file.getOriginalFilename();
        String safeName = Paths.get(original).getFileName().toString();
        String savedName = UUID.randomUUID() + "_" + safeName;

        file.transferTo(uploadDir.resolve(savedName));

        return ResponseEntity.ok(Map.of(
                "message", "File uploaded",
                "fileName", savedName,
                "size", file.getSize()
        ));
    }
}