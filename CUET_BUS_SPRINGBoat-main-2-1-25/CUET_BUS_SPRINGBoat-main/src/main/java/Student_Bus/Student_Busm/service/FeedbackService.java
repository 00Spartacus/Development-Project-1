package Student_Bus.Student_Busm.service;

import Student_Bus.Student_Busm.entity.Feedback;
import Student_Bus.Student_Busm.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Create new feedback
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Get all feedbacks
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // Get feedback by ID
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
    }

    // Delete feedback by ID
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}


