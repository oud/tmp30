package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class OperationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Operation getOperationSample1() {
        return new Operation().id(1L).typeMEG("typeMEG1").codeOffre("codeOffre1");
    }

    public static Operation getOperationSample2() {
        return new Operation().id(2L).typeMEG("typeMEG2").codeOffre("codeOffre2");
    }

    public static Operation getOperationRandomSampleGenerator() {
        return new Operation()
            .id(longCount.incrementAndGet())
            .typeMEG(UUID.randomUUID().toString())
            .codeOffre(UUID.randomUUID().toString());
    }
}
