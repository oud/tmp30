package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class GroupeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Groupe getGroupeSample1() {
        return new Groupe().id(1L).typeMEG("typeMEG1").codeOffre("codeOffre1");
    }

    public static Groupe getGroupeSample2() {
        return new Groupe().id(2L).typeMEG("typeMEG2").codeOffre("codeOffre2");
    }

    public static Groupe getGroupeRandomSampleGenerator() {
        return new Groupe().id(longCount.incrementAndGet()).typeMEG(UUID.randomUUID().toString()).codeOffre(UUID.randomUUID().toString());
    }
}
