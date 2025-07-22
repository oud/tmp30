package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ContratTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Contrat getContratSample1() {
        return new Contrat().id(1L).typeMEG("typeMEG1").codeOffre("codeOffre1");
    }

    public static Contrat getContratSample2() {
        return new Contrat().id(2L).typeMEG("typeMEG2").codeOffre("codeOffre2");
    }

    public static Contrat getContratRandomSampleGenerator() {
        return new Contrat().id(longCount.incrementAndGet()).typeMEG(UUID.randomUUID().toString()).codeOffre(UUID.randomUUID().toString());
    }
}
