package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TauxTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Taux getTauxSample1() {
        return new Taux().id(1L).typeMEG("typeMEG1").codeOffre("codeOffre1");
    }

    public static Taux getTauxSample2() {
        return new Taux().id(2L).typeMEG("typeMEG2").codeOffre("codeOffre2");
    }

    public static Taux getTauxRandomSampleGenerator() {
        return new Taux().id(longCount.incrementAndGet()).typeMEG(UUID.randomUUID().toString()).codeOffre(UUID.randomUUID().toString());
    }
}
